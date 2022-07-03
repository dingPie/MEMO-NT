import React from "react";
import { useNavigate } from "react-router";

import { IMemo } from "../../../utils/interface/interface";

import { FbMemo } from "../../../firebase/firestore_memo_service";
import { FbTag } from "../../../firebase/firestore_tag_service";

import TalkMemu from "../menu/TalkMenu";
import { FbAuth } from "../../../firebase/firebase_auth_service";


interface IMenuContainer {
  fbAuth: FbAuth;
  fbTag: FbTag;
  fbMemo: FbMemo;
  selectedMemo: IMemo | null;
  setSelectedMemo: (v: IMemo | null) => void;
  setEditMemo: (v: IMemo | null) => void;
  setIsOpenDeletePopup: (v:boolean) => void;
}


const MenuContainer = ( {
  fbAuth,
  fbTag, 
  fbMemo,
  selectedMemo, 
  setSelectedMemo, 
  setEditMemo,  
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
   const onClickPinnBtn = async () => {
    if (selectedMemo) {
      await fbAuth.setPinnedMemo(selectedMemo.id)
    } 
    setSelectedMemo(null)
  }


  /* Menu: 메모 이동 : 메모 이동 클릭*/
  const onClicGoMemoBtn = () => {
    navigate(`/memo/${selectedMemo!.tagId}`)
  }

  

  return(
    <>
      {/* ... 클릭시 메뉴 */}
      { selectedMemo && 
        <TalkMemu
          selectedMemo={selectedMemo}
          onClickEditBtn={onClickEditBtn}
          onClickDeleteBtn={onClickDeleteBtn}
          onClickPinnBtn={onClickPinnBtn}
          onClicGoMemoBtn={onClicGoMemoBtn}
          onClickCloseMenuBtn={onClickCloseMenuBtn}
        />
      }
    </>
  )
}

export default MenuContainer;