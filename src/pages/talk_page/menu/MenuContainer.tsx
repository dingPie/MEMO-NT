import React, { useState } from "react";
import styled from "styled-components";
import { RowBox } from "../../../components/FlexBox";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan, faThumbTack, faExpand, faAlignLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { IconBox } from "../../../components/IconBox";
import { IMemo } from "../../../utils/interface/interface";
import TalkMemu from "./TalkMenu";
import TalkDeletePopup from "../TalkDeletePopup";
import { FbTag } from "../../../firebase/firestore_tag_service";
import { FbMemo } from "../../../firebase/firestore_memo_service";
import { useNavigate } from "react-router";


interface IMenuContainer {
  fbTag: FbTag;
  fbMemo: FbMemo;
  viewMemo: IMemo[];
  selectedMemo: IMemo | null;
  pinnedMemo: IMemo | null;
  setSelectedMemo: (v: IMemo | null) => void;
  setEditMemo: (v: IMemo | null) => void;
  setPinnedMemo: (v: IMemo | null) => void;
  setViewMemo: (viewMemo: IMemo[]) => void;
  isOpenDeletePopup: boolean;
  setIsOpenDeletePopup: (v:boolean) => void;
}


const MenuContainer = ( {
  fbTag, 
  fbMemo, 
  viewMemo, 
  selectedMemo, 
  pinnedMemo, 
  setSelectedMemo, 
  setEditMemo, 
  setPinnedMemo, 
  setViewMemo,
  isOpenDeletePopup,
  setIsOpenDeletePopup
}: IMenuContainer ) => {

  const navigate = useNavigate();
  // const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);

  const onClickCloseMenuBtn = () => {
    setSelectedMemo(null)
  }
  
  /* Menu: 수정관련 */ 
  // 수정버튼 클릭
  const onClickEditBtn = () => {
    if (!selectedMemo) return
    setEditMemo(selectedMemo)
    setSelectedMemo(null)
  }

  /* Menu: 삭제관련 */
  // 삭제버튼 클릭
  const onClickDeleteBtn = () => {
    setIsOpenDeletePopup(true)
  }
  
  /* Menu: 상단 핀: 핀 버튼 클릭 */
   const onClickPinnBtn = () => {
    if (selectedMemo) setPinnedMemo(selectedMemo)
    setSelectedMemo(null)
  }

  /* Menu: 메모 확장 관련: 메모 확장클릭 */
  const onClickExpandBtn = () => {
    // 현재 사용 x
  }

  /* Menu: 메모 이동 : 메모 이동 클릭*/
  const onClicGoMemoBtn = () => {
    navigate(`/memo/${selectedMemo!.tagId}`)
  }

  React.useEffect(() => {
    console.log(isOpenDeletePopup,"현재상태")
  }, [isOpenDeletePopup])
  

  return(
    <>
      {/* ... 클릭시 메뉴 */}
      { selectedMemo && 
        <TalkMemu 
          onClickEditBtn={onClickEditBtn}
          onClickDeleteBtn={onClickDeleteBtn}
          onClickPinnBtn={onClickPinnBtn}
          onClickExpandBtn={onClickExpandBtn}
          onClicGoMemoBtn={onClicGoMemoBtn}
          onClickCloseMenuBtn={onClickCloseMenuBtn}
        />
      }
    </>
  )
}

export default MenuContainer;