import  React, { memo, useCallback, useEffect, useRef, useState } from "react";
import useStore from "../../../store/useStore";
import { useNavigate } from "react-router";

import { ColBox } from "../../../components/FlexBox";

import { FbAuth } from "../../../firebase/firebase_auth_service";
import { IMemo, IUserInfo } from "../../../utils/interface/interface";

// Memo Components
import { MemoProps } from "../MemoPage";
import MemoContent from "./MemoContent";
import MemoEditContent from "./MemoEditContent";

interface IMemoContentContainer extends MemoProps {
  fbAuth: FbAuth;
  userInfo: IUserInfo | null;
  memoList: IMemo[];
  setMemoList: (memo: IMemo[]) => void;
  isOpenMenu: boolean;
  isOpenInputMemo: boolean;
  isOpenEditTag: boolean;
  setIsOpenInputMemo: (v: boolean) => void;

  editMemo: IMemo | null;
  setEditMemo: (memo: IMemo| null) => void;
}

const MemoContentContainer = ( { editMemo, setEditMemo, fbAuth, fbTag, fbMemo, userInfo, memoList, setMemoList, isOpenMenu, isOpenEditTag, isOpenInputMemo, setIsOpenInputMemo }: IMemoContentContainer ) => {

  const { loading } = useStore();
  const navigate = useNavigate();
  const [inputMemo, setInputMemo] = useState("");
  // const [editMemo, setEditMemo] = useState<IMemo | null>(null)
  

  //내용 수정
  const onChangeInputMemo = useCallback((e: React.ChangeEvent<HTMLTextAreaElement> ) => {
    setInputMemo(e.target.value)
  }, [inputMemo])


  // 메모 클릭 => 수정 input창 출력
  const onClickMemo = useCallback((e: React.MouseEvent<HTMLDivElement>, memo: IMemo) => {
    if (isOpenMenu || isOpenInputMemo || isOpenEditTag) return
    console.log("현재 에딧 메모", editMemo)
    if (editMemo) {
      setEditMemo(null)
      setInputMemo("")
    } else {
      setInputMemo(memo.content)
      setEditMemo(memo)
    }
  }, [isOpenMenu, isOpenInputMemo, editMemo])


  // 수정 처리
  const onClickDoEditMemo = useCallback( async (editMemo: IMemo, inputMemo: string) => {
    setInputMemo("")
    setEditMemo(null)
    if (inputMemo === editMemo.content) return
    loading.start();

    await fbMemo.editMemoContent(editMemo.id, inputMemo);
    const editedMemo: IMemo = {  // 메모(태그) state 수정
      ...editMemo,
      content: inputMemo
    }
    const newMemoList = memoList.map(memo => (memo.id === editMemo.id) ? editedMemo : memo)
    setMemoList(newMemoList);
    loading.finish();
  }, [memoList] )


  // 메모 삭제 로직
  const onClickDoDeleteMemo = useCallback( async (e: React.MouseEvent<HTMLDivElement>, editMemo: IMemo) => {
    setEditMemo(null)
    const confirm = window.confirm("이 메모를 삭제할까요?")
    if (!confirm) return

    loading.start();
    await fbMemo.deleteMemo(editMemo.id)
    await fbTag.deleteUsedMemo(editMemo)
    const newViewMemo = memoList.filter(memo => memo.id !== editMemo.id );
    setMemoList(newViewMemo);
    
    // pinnedMemo같이 삭제
    if (userInfo!.pinnedMemo === editMemo.id) {
      await fbAuth.setPinnedMemo('')
    }
    // 해당 태그의 메모가 비었을 떄 삭제
    if (newViewMemo.length === 0) { 
      if (editMemo.tagId === "undefined" || editMemo.tagId === "toBeDeleted") {}
      else fbTag.deleteTag(editMemo.tagId)
      navigate('/grid')
      

    }
    loading.finish();
  }, [memoList, userInfo])



  return(
      <>
        <ColBox 
          gap={.25} 
          padding="0" 
        >
          { memoList.map( (memo, id) => {
            return(
              (editMemo !== memo ) ?
              <MemoContent
                key={id}
                memo={memo}
                onClickMemo={(e) => onClickMemo(e, memo)} 
              /> :
              <MemoEditContent
                key={memo.id}
                editMemo={editMemo}
                inputMemo={inputMemo}
                onChangeInputMemo={onChangeInputMemo}
                onClickDoEditMemo={onClickDoEditMemo}
                onClickDoDeleteMemo={onClickDoDeleteMemo}
              />
            )
          })}
        </ColBox>

      </>
  )
}

export default memo(MemoContentContainer);