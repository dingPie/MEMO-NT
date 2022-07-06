import React, { useState } from "react";
import { useNavigate } from "react-router";
import useStore from "../../../store/useStore";

// utils
import { FbAuth } from "../../../firebase/firebase_auth_service";
import { FbMemo } from "../../../firebase/firestore_memo_service";
import { FbTag } from "../../../firebase/firestore_tag_service";
import { ITag, IUserInfo } from "../../../utils/interface/interface";

// Memo Components
import { MemoProps } from "../MemoPage";
import MemoDeleteConfirmPopup from "./MemoDeleteConfirmPopup";
import MemoDeletePopup from "./MemoDeletePopup";

interface IMemoDeletePopupContainer extends MemoProps {
  fbAuth: FbAuth;
  isOpenDeleteMemo: boolean;
  setIsOpenDeleteMemo: (v: boolean) => void;
  userInfo: IUserInfo | null;
}

const MemoDeletePopupContainer = ( { fbAuth, userInfo, fbTag, fbMemo, tag, isOpenDeleteMemo, setIsOpenDeleteMemo }: IMemoDeletePopupContainer ) => {

  const navigate = useNavigate();
  const { loading } = useStore();
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
    loading.start();
    
    // 핀 메모도 함께 삭제
    if (tag.usedMemo.includes(userInfo!.pinnedMemo)) {
      await fbAuth.setPinnedMemo('')
    }
    
    // 삭제예정 혹은 언디파인 삭제시
    if (tag.id === "undefined" || tag.id === "toBeDeleted") {
      alert("해당 태그는 삭제가 불가능합니다. 내용만 삭제됩니다.")
      tag.usedMemo.map( async memoId => {
        await fbMemo.deleteMemo(memoId)
      })
      await fbTag.deleteUsedMemoAll(tag.id)
    } // 그 외 삭제시
    else {
      await fbTag.deleteTag(tag.id) // 태그 삭제
      tag.usedMemo.map( async memoId =>  await fbMemo.deleteMemo(memoId))
    }

    loading.finish();
    navigate('/grid')
  }
  

  // 삭제: 태그만 삭제
  const onClickDoDeleteOnlyTag = async (tag: ITag) => {
    setIsOpenDeleteConfirm(false)
    loading.start();
    
    // 삭제예정 혹은 언디파인 삭제시
    if (tag.id === "undefined" || tag.id === "toBeDeleted") {
      alert("해당 태그는 삭제가 불가능합니다. 내용만 삭제됩니다.")
      tag.usedMemo.map( async memoId => {
        await fbMemo.deleteMemo(memoId)
      })
      await fbTag.deleteUsedMemoAll(tag.id)
    } 
    else {
      tag.usedMemo.map( async memoId => await fbMemo.editMemoUsedTag(memoId, "undefined"))
      await fbTag.addUsedMemoAll("undefined", tag.usedMemo)
      await fbTag.deleteTag(tag.id) // 태그 삭제
    }// 그 외 삭제시

    loading.finish();
    navigate('/grid')
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



