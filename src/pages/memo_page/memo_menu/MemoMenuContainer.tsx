import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useStore from "../../../store/useStore";

import { RowBox } from "../../../components/FlexBox";

import { slideUp } from "../../../styles/stylesCss";
import { IMemo, ITag } from "../../../utils/interface/interface";

// Memo Components
import { MemoProps } from "../MemoPage";
import MemoPalette from "./MemoPalette";
import MemoMenu from "./MemoMenu";
import MemoTagOption from "./MemoTagOption";




interface IMemoMenuContainer extends MemoProps {
  isOpenMenu: boolean;
  setIsOpenMenu: (v: boolean) => void;
  setIsOpenDeleteMemo: (v: boolean) => void;
  setIsOpenEditTag: (v: boolean) => void;

  tags: ITag[];
  editMemo: IMemo | null;
  setEditMemo: (memo: IMemo| null) => void;

  memoList: IMemo[];
  setMemoList: (memo: IMemo[]) => void;
}


const MemoMenuContainer = ( { memoList, setMemoList, editMemo, setEditMemo, tags, fbTag, fbMemo, tag, isOpenMenu, setIsOpenMenu, setIsOpenDeleteMemo, setIsOpenEditTag }: IMemoMenuContainer ) => {

  const { loading } = useStore();
  const navigate = useNavigate();
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


  // 태그 옵션버튼 클릭 => 현재 메모의 태그만 변경됨 (메모 내용 변경 없음).
  const onClickTagOption = async (tagId: string, editMemo: IMemo) => {
    setEditMemo(null)
    const confirm = window.confirm("이 메모의 태그를 변경할까요?")
    if (!confirm) return
    loading.start();

    await fbMemo.editMemoUsedTag(editMemo.id, tagId) // 현재 메모의 태그 아이디를 수정해주고
    await fbTag.addUsedMemo(tagId, editMemo.id)  // 존재하던 태그에 수정한 메모 id 넣어주고
    await fbTag.deleteUsedMemo(editMemo) // 현재 태그에서 editMemo에서 현재 메모 아이디 빼주고
  
    const newViewMemo = memoList.filter(memo => memo.id !== editMemo.id );
    setMemoList(newViewMemo);

    if (newViewMemo.length === 0) { 
    if (editMemo.tagId === "undefined" || editMemo.tagId === "toBeDeleted") {} 
    else fbTag.deleteTag(editMemo.tagId)
    navigate('/grid')
    }
    loading.finish();
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
          tag={tag}
          onClickEditBtn={onClickEditBtn}
          onClickDeleteBtn={onClickDeleteBtn}
          onClickPaletteBtn={onClickPaletteBtn}
          onClickCloseMenuBtn={onClickCloseMenuBtn}
        />
      }
      { editMemo &&
        <MemoTagOption
          tags={tags}
          // tag={tag}
          editMemo={editMemo}
          onClickTagOption={onClickTagOption}
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