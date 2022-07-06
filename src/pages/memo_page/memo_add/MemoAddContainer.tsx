import  React, { memo, useCallback, useEffect, useRef, useState } from "react";
import useStore from "../../../store/useStore";

import { CustomBtn } from "../../../components/Buttons";

import { FbAuth } from "../../../firebase/firebase_auth_service";
import { IMemo, IUserInfo } from "../../../utils/interface/interface";

// Memo Components
import { MemoProps } from "../MemoPage";
import MemoInputAdd from "./MemoInputAdd";

interface IMemoAddContainer extends MemoProps {
  memoList: IMemo[];
  setMemoList: (memo: IMemo[]) => void;
  isOpenMenu: boolean;
  isOpenInputMemo: boolean;
  isOpenEditTag: boolean;
  setIsOpenInputMemo: (v: boolean) => void;
}

const MemoAddContainer = ( { fbTag, fbMemo, tag, memoList, setMemoList, isOpenMenu, isOpenEditTag, isOpenInputMemo, setIsOpenInputMemo }: IMemoAddContainer ) => {

  const { loading } = useStore();
  const [inputMemo, setInputMemo] = useState("");


  // 추가하기 버튼 클릭
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



  return(
      <>
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
      </>
  )
}

export default memo(MemoAddContainer);
