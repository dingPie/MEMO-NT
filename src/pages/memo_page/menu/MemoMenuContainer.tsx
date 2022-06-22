import React, { useState } from "react";
import styled from "styled-components";
import { RowBox } from "../../../components/FlexBox";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan, faPalette, faXmark } from "@fortawesome/free-solid-svg-icons";
import { IconBox } from "../../../components/IconBox";
import MemoPalette from "./MemoPalette";
import MemoMenu from "./MemoMenu";
import { FbMemo } from "../../../firebase/firestore_memo_service";
import { FbTag } from "../../../firebase/firestore_tag_service";
import { ITag } from "../../../utils/interface/interface";
import { MemoProps } from "../MemoPage";


interface IMemoMenuContainer extends MemoProps {
  isOpenMenu: boolean;
  setIsOpenMenu: (v: boolean) => void;
  setIsOpenDeleteMemo: (v: boolean) => void;
  setIsOpenEditTag: (v: boolean) => void;
}


const MemoMenuContainer = ( { fbTag, fbMemo, tag, isOpenMenu, setIsOpenMenu, setIsOpenDeleteMemo, setIsOpenEditTag }: IMemoMenuContainer ) => {

  const [isOpenPalette, setIsOpenPalette] = useState(false); // palette창 on/off
  const [seletedColor, setSeletedColor] = useState(parseInt(tag.color))

  
  // 수정버튼 클릭
  const onClickEditBtn = () => {
    setIsOpenEditTag(true)
    setIsOpenMenu(false)
  }
  // 삭제버튼 클릭
  const onClickDeleteBtn = () => {
    setIsOpenDeleteMemo(true)
    setIsOpenMenu(false)
  }
  // 메뉴 창닫기
  const onClickCloseMenuBtn = () => {
    setIsOpenMenu(false)
  }

  // 팔레트 클릭
  const onClickPaletteBtn = () => {
    setIsOpenPalette(true)
    setIsOpenMenu(false)
  }
  // 팔레트 색변경
  const onClickDoEditPalette = (tag: ITag) => {
    fbTag.editTagColor(tag.id, seletedColor.toString())
    setIsOpenPalette(false)
  }
  // 각 팔레트 클릭시 색상선택값 변경
  const onClickSelectColor = (colorId: number) => {
    setSeletedColor(colorId)
  }
 


  return(
    <>
      {/* 팔레트 */}
      { isOpenPalette &&
        <MemoPalette
          tag={tag}
          seletedColor={seletedColor}
          onClickSelectColor={onClickSelectColor}
          onClickDoEditPalette={onClickDoEditPalette}
        />
      }
      {/* 메뉴 */}
      { isOpenMenu &&
        <MemoMenu
          onClickEditBtn={onClickEditBtn}
          onClickDeleteBtn={onClickDeleteBtn}
          onClickPaletteBtn={onClickPaletteBtn}
          onClickCloseMenuBtn={onClickCloseMenuBtn}
        />
      }
    </>
  )
}

export default MemoMenuContainer;

// 나중에 Buttom 부분 빼서 동기화

export const MenuBox = styled(RowBox)`
  display: flex;
  position: fixed;
  align-items: center;
  bottom: 0; // input Box 크기
  left: 50%;
  transform: translate(-50%, 0);
  
  padding: .25rem;
  max-width: 30rem;
  background: white;
`