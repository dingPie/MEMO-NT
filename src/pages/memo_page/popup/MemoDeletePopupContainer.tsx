import React, { useState } from "react";
import { useNavigate } from "react-router";

import { FbMemo } from "../../../firebase/firestore_memo_service";
import { FbTag } from "../../../firebase/firestore_tag_service";
import { ITag } from "../../../utils/interface/interface";
import MemoDeleteConfirmPopup from "./MemoDeleteConfirmPopup";
import MemoDeletePopup from "./MemoDeletePopup";

interface IMemoDeletePopupContainer {
  fbTag: FbTag;
  fbMemo: FbMemo;
  tag: ITag;
  isOpenDeleteMemo: boolean;
  // isOpenDeleteConfirm: boolean;
  setIsOpenDeleteMemo: (v: boolean) => void;
  // setIsOpenDeleteConfirm: (v: boolean) => void;
}

const MemoDeletePopupContainer = ( { fbTag, fbMemo, tag, isOpenDeleteMemo, setIsOpenDeleteMemo }: IMemoDeletePopupContainer ) => {

  const navigate = useNavigate();
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false);

  // 삭제 확인버튼 클릭
  const onClickDoDelete = () => {
    setIsOpenDeleteMemo(false)
    setIsOpenDeleteConfirm(true)
  }

  // 삭제: 태그와 메모 전체삭제
  const onClickDoDeleteAll = () => {
    setIsOpenDeleteConfirm(false)
    // 전체 삭제 로직 실행
    navigate('/grid')
  }

  // 삭제: 태그만 삭제
  const onClickDoDeleteOnlyTag = () => {
    setIsOpenDeleteConfirm(false)
    // 태그만 삭제 로직 실행
    navigate('/grid')
  }


  return(
   <>
      { isOpenDeleteMemo &&
        <MemoDeletePopup 
          onClickCancel={() => setIsOpenDeleteMemo(false)}
          onClickDo={onClickDoDelete}
        />
      }
        { isOpenDeleteConfirm &&
        <MemoDeleteConfirmPopup
          onClickDoDeleteOnlyTag={onClickDoDeleteOnlyTag}
          onClickDoDeleteAll={onClickDoDeleteAll}
        />
      }
   </>
  )
}

export default MemoDeletePopupContainer;