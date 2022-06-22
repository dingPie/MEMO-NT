import React, { useState } from "react";
import { useNavigate } from "react-router";

import { FbMemo } from "../../../firebase/firestore_memo_service";
import { FbTag } from "../../../firebase/firestore_tag_service";
import { ITag } from "../../../utils/interface/interface";
import { MemoProps } from "../MemoPage";
import MemoDeleteConfirmPopup from "./MemoDeleteConfirmPopup";
import MemoDeletePopup from "./MemoDeletePopup";

interface IMemoDeletePopupContainer extends MemoProps {
  isOpenDeleteMemo: boolean;
  setIsOpenDeleteMemo: (v: boolean) => void;
}

const MemoDeletePopupContainer = ( { fbTag, fbMemo, tag, isOpenDeleteMemo, setIsOpenDeleteMemo }: IMemoDeletePopupContainer ) => {

  const navigate = useNavigate();
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false);

  
  // 삭제 확인버튼 클릭
  const onClickDoDelete = () => {
    setIsOpenDeleteMemo(false)
    setIsOpenDeleteConfirm(true)
  }
  // 삭제 취소버튼
  const onClickCancelDelete = () => {
    setIsOpenDeleteMemo(false)
  }

  // 삭제: 태그와 메모 전체삭제
  const onClickDoDeleteAll = async (tag: ITag) => {
    setIsOpenDeleteConfirm(false)
    navigate('/grid')

    await fbTag.deleteTag(tag.id) // 태그 삭제
    tag.usedMemo.map( async memoId => { // 비동기식으로 사용된 usedMemo를 undefined에 추가 및 각 메모의 태그이름 변경
      await fbMemo.deleteMemo(memoId)
    })
  }
  
  // 삭제: 태그만 삭제
  const onClickDoDeleteOnlyTag = async (tag: ITag) => {
    setIsOpenDeleteConfirm(false)
    navigate('/grid')
    
    await fbTag.deleteTag(tag.id) // 태그 삭제
    tag.usedMemo.map( async memoId => {     // 비동기식으로 사용된 usedMemo를 undefined에 추가 및 각 메모의 태그이름 변경
      await fbTag.addUsedMemo("undefined", memoId)
      await fbMemo.editMemoUsedTag(memoId, "undefined")
    })
  }


  return(
   <>
      { isOpenDeleteMemo &&
        <MemoDeletePopup 
          onClickCancelDelete={onClickCancelDelete}
          onClickDoDelete={onClickDoDelete}
        />
      }
        { isOpenDeleteConfirm &&
        <MemoDeleteConfirmPopup
          tag={tag}
          onClickDoDeleteOnlyTag={onClickDoDeleteOnlyTag}
          onClickDoDeleteAll={onClickDoDeleteAll}
        />
      }
   </>
  )
}

export default MemoDeletePopupContainer;