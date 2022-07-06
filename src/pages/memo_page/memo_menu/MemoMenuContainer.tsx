import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useStore from "../../../store/useStore";

import { RowBox } from "../../../components/FlexBox";

import { slideUp } from "../../../styles/stylesCss";
import { ITag } from "../../../utils/interface/interface";

// Memo Components
import { MemoProps } from "../MemoPage";
import MemoPalette from "./MemoPalette";
import MemoMenu from "./MemoMenu";



interface IMemoMenuContainer extends MemoProps {
  isOpenMenu: boolean;
  setIsOpenMenu: (v: boolean) => void;
  setIsOpenDeleteMemo: (v: boolean) => void;
  setIsOpenEditTag: (v: boolean) => void;
}


const MemoMenuContainer = ( { fbTag, fbMemo, tag, isOpenMenu, setIsOpenMenu, setIsOpenDeleteMemo, setIsOpenEditTag }: IMemoMenuContainer ) => {

  const { loading } = useStore();
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
    loading.start();
    fbTag.editTagColor(tag.id, seletedColor.toString())
    setIsOpenPalette(false)
    loading.finish();
  }
  // 각 팔레트 클릭시 색상선택값 변경
  const onClickSelectColor = (colorId: number) => {
    setSeletedColor(colorId)
  }
 
  useEffect(() => {
    if (isOpenMenu && isOpenPalette) setIsOpenPalette(false)
  }, [isOpenMenu])


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
          tag={tag}
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
  align-items: center;
  gap: 0;
  padding: .25rem;
  max-width: 30rem;
  background: white;

  animation: ${slideUp} .2s;
`