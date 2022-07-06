import  React, { memo, useCallback, useEffect, useRef, useState } from "react";
import useStore from "../../../store/useStore";
import { useNavigate } from "react-router";

import { CustomBtn } from "../../../components/Buttons";
import { ColBox } from "../../../components/FlexBox";

import { FbAuth } from "../../../firebase/firebase_auth_service";
import { IMemo, IUserInfo } from "../../../utils/interface/interface";

// Memo Components
import { IEditMemo, MemoProps } from "../MemoPage";
import MemoContent from "./MemoContent";
import MemoInputAdd from "./MemoInputAdd";
import MemoInputEdit from "./MemoInputEdit";

interface IMemoContentContainer extends MemoProps {
  fbAuth: FbAuth;
  memoList: IMemo[];
  setMemoList: (memo: IMemo[]) => void;
  isOpenMenu: boolean;
  userInfo: IUserInfo | null;
  isOpenInputMemo: boolean;
  isOpenEditTag: boolean;
  setIsOpenInputMemo: (v: boolean) => void;
}

const MemoContentContainer = ( { userInfo, fbAuth, fbTag, fbMemo, tag, memoList, setMemoList, isOpenMenu, isOpenEditTag, isOpenInputMemo, setIsOpenInputMemo }: IMemoContentContainer ) => {

  const { loading } = useStore();
  const navigate = useNavigate();
  const [inputMemo, setInputMemo] = useState("");
  const [editMemo, setEditMemo] = useState<IEditMemo | null>(null)


  //버튼 클릭
  const onClickAddMemoBtn = useCallback(() => {
    if (isOpenMenu || isOpenEditTag) return
    setIsOpenInputMemo(true)
  },[isOpenMenu, isOpenInputMemo])


  // 메모 추가 확인
  const onClickAddConfirm = useCallback( async (tagId: string, inputMemo: string) => {
    loading.start();
    const newMemo = await fbMemo.addMemo(tagId, inputMemo);
    fbTag.addUsedMemo(tagId, newMemo!.id)

    setMemoList([...memoList, newMemo!])
    setIsOpenInputMemo(false)
    setInputMemo("")
    loading.finish();
  }, [memoList, loading])


  // 메모 추가 취소
  const onClickAddCancel = useCallback(() => {
    setIsOpenInputMemo(false)
    setInputMemo("")
  }, [isOpenInputMemo, inputMemo])


  //내용 수정
  const onChangeInputMemo = useCallback((e: React.ChangeEvent<HTMLTextAreaElement> ) => {
    setInputMemo(e.target.value)
  }, [inputMemo])


  // 메모 클릭 => 수정 input창 출력
  const onClickMemo = useCallback((e: React.MouseEvent<HTMLDivElement>, memo: IMemo) => {
    if (isOpenMenu || isOpenInputMemo || isOpenEditTag) return
    loading.start();

    const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
    e.currentTarget.offsetTop
    const newEditMemo = {
      memo: memo,
      x: x,
      y: y,
      width: width,
      height: height
    }
    setInputMemo(memo.content)
    setEditMemo(newEditMemo)
    loading.finish();
  }, [isOpenMenu, isOpenInputMemo])


  // 수정 실행 (종료)
  const onClickDoEditMemo = useCallback( async (editMemo: IEditMemo, inputMemo: string) => {
    setInputMemo("")
    setEditMemo(null)
    if (inputMemo === editMemo!.memo.content) return
    loading.start();
    await fbMemo.editMemoContent(editMemo.memo.id, inputMemo);

    const editedMemo: IMemo = {  // 메모(태그) state 수정
      ...editMemo.memo,
      content: inputMemo
    }
    const newMemoList = memoList.map(memo => (memo.id === editMemo.memo.id) ? editedMemo : memo)
    setMemoList(newMemoList);
    loading.finish();
  }, [memoList] )


  // 메모 삭제 로직
  const onClickDoDeleteMemo = useCallback( async (e: React.MouseEvent<HTMLDivElement>, editMemo: IEditMemo) => {
    setEditMemo(null)
    const confirm = window.confirm("이 메모를 삭제할까요?")
    if (!confirm) return

    loading.start();
    await fbMemo.deleteMemo(editMemo.memo!.id)
    await fbTag.deleteUsedMemo(editMemo.memo!)
    const newViewMemo = memoList.filter(memo => memo.id !== editMemo.memo.id );
    setMemoList(newViewMemo);
    loading.finish();

    // pinnedMemo같이 삭제
    if (userInfo!.pinnedMemo === editMemo.memo!.id) {
      await fbAuth.setPinnedMemo('')
    }
    // 해당 태그의 메모가 비었을 떄 삭제
    if (newViewMemo.length === 0) { 
      fbTag.deleteTag(editMemo.memo!.tagId)
      navigate('/grid')
    }
  }, [memoList, userInfo])



  return(
      <>
        <ColBox gap={.25} padding="0" >
          { memoList.map( (memo, id) => {
            return(
              <MemoContent
                key={id}
                memo={memo}
                onClickMemo={(e) => onClickMemo(e, memo)} 
              />
            )
          })}
        </ColBox>

        {/* 메모 추가 */}
        { isOpenInputMemo &&
          <MemoInputAdd
            tag={tag}
            inputMemo={inputMemo}
            onChangeInputMemo={onChangeInputMemo}
            onClickAddConfirm={onClickAddConfirm}
            onClickAddCancel={onClickAddCancel}
          /> 
        }
        { !isOpenInputMemo &&
          <CustomBtn
            fontSize="s"
            bgColor="#dddddd"
            onClick={onClickAddMemoBtn}
          >
            메모 추가
          </CustomBtn>
        }

        { editMemo &&
          <MemoInputEdit
            editMemo={editMemo}
            inputMemo={inputMemo}
            onChangeInputMemo={onChangeInputMemo}
            onClickDoEditMemo={onClickDoEditMemo}
            onClickDoDeleteMemo={onClickDoDeleteMemo}
          />
        }

      </>
  )
}

export default memo(MemoContentContainer);
