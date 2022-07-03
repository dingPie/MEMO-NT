import  React, { useEffect, useState } from "react";
import useStore from "../../../store/useStore";

import { CustomBtn } from "../../../components/Buttons";
import { ColBox } from "../../../components/FlexBox";

import { IMemo, IUserInfo } from "../../../utils/interface/interface";

// Memo Components
import { IEditMemo, MemoProps } from "../MemoPage";
import MemoContent from "./MemoContent";
import MemoInputAdd from "./MemoInputAdd";
import MemoInputEdit from "./MemoInputEdit";
import { useNavigate } from "react-router";
import { FbAuth } from "../../../firebase/firebase_auth_service";

interface IMemoContentContainer extends MemoProps {
  // memo: IMemo;
  memoList: IMemo[];
  setMemoList: (memo: IMemo[]) => void;
  isOpenMenu: boolean;
  userInfo: IUserInfo | null;

  fbAuth: FbAuth;
}

const MemoContentContainer = ( { userInfo, fbAuth, fbTag, fbMemo, tag, memoList, setMemoList, isOpenMenu }: IMemoContentContainer ) => {

  const { loading } = useStore();
  const navigate = useNavigate();
  const [isOpenInputMemo, setIsOpenInputMemo] = useState(false);
  const [inputMemo, setInputMemo] = useState("");
  const [editMemo, setEditMemo] = useState<IEditMemo | null>(null)

  //버튼 클릭
  const onClickAddMemoBtn = () => {
    setIsOpenInputMemo(true)
  }

  // 메모 추가 확인
  const onClickAddConfirm = async (tagId: string, inputMemo: string) => {
    loading.start();
    const newMemo = await fbMemo.addMemo(tagId, inputMemo);
    fbTag.addUsedMemo(tagId, newMemo!.id)

    setMemoList([...memoList, newMemo!])
    setIsOpenInputMemo(false)
    setInputMemo("")
    loading.finish();
  }

  // 메모 추가 취소
  const onClickAddCancel = () => {
    setIsOpenInputMemo(false)
    setInputMemo("")
  }


  //내용 수정
  const onChangeInputMemo = (e: React.ChangeEvent<HTMLTextAreaElement> ) => {
    setInputMemo(e.target.value)
  }

  // 메모 클릭 => 수정 input창 출력
  const onClickMemo = (e: React.MouseEvent<HTMLDivElement>, memo: IMemo) => {
    if (isOpenMenu) return
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
    setInputMemo(memo.content )
    setEditMemo(newEditMemo)
    loading.finish();
  }

  // 수정 실행 (종료)
  const onClickDoEditMemo = async (editMemo: IEditMemo, inputMemo: string) => {
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
  }

  // 메모 삭제 로직
  const onClickDoDeleteMemo = async (e: React.MouseEvent<HTMLDivElement>, editMemo: IEditMemo) => {
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
  }



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

export default MemoContentContainer;
