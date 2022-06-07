import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router";

import Text from "../../components/Text";
import { ColBox, RowBox } from "../../components/FlexBox";
import Header from "../../components/Header";
import { MobileBox } from "../../components/MobileBox";
import { dummyMemos, dummyTags } from "../../utils/data/dummyData";
import MemoName from "./MemoName";
import MemoContent from "./MemoContent";
import { InputText } from "../../components/InputText";
import { CustomBtn } from "../../components/Buttons";
import MemoMenu from "./MemoMenu";
import EditMemoTag from "./EditMemoTag";
import MemoDeletePopup from "./MemoDeletePopup";
import MemoDeleteConfirmPopup from "./MemoDeleteConfirmPopup";
import MemoPalette from "./MemoPalette";
import TagService from "../../utils/data/tag_service";
import MemoInputEdit from "./MemoInputEdit";
import MemoInputAdd from "./MemoInputAdd";
import { IMemo } from "../../utils/interface/interface";

export interface IEditMemo {
  memo: IMemo;
  x: number;
  y: number;
  width: number;
  height: number;
}

const MemoPage = () => {

  const tagService = new TagService();
  const { tagId } = useParams();
  const tag = tagService.findTag(tagId!);

  const navigate = useNavigate();
  const memoList = tag.memo.map( memoId => dummyMemos.filter(memo => memo.id === memoId)[0]);

  const [isOpenMenu, setIsOpenMenu] = useState(false); // munue on /off
  
  const [isOpenEditTag, setIsOpenEditTag] = useState(false); // edit 창 on/off
  const [isOpenPalette, setIsOpenPalette] = useState(false); // palette창 on/off

  const [isOpenInputMemo, setIsOpenInputMemo] = useState(false);
  const [inputMemo, setInputMemo] = useState("");

  const [editMemo, setEditMemo] = useState<IEditMemo | null>(null)

  const [isOpenDeleteMemo, setIsOpenDeleteMemo] = useState(false);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false);

  const onClickOtherBtn = () => {
    navigate(-1)
  }

  /* Memo: 추가 관련 */
  // 메모추가버튼 클릭
  const onClickAddMemoBtn = () => {
    setIsOpenInputMemo(true)
  }
  // 메모 추가 확인
  const onClickAddConfirm = () => {
    // 신규 메모 추가로직
    setIsOpenInputMemo(false)
    setInputMemo("")
  }
  // 메모 추가 취소
  const onClickAddCancel = () => {
    setIsOpenInputMemo(false)
    setInputMemo("")
  }

  /* Memo: 수정 관련 */
  // 메모 클릭 => 수정 input창 출력
  const onClickMemo = (e: React.MouseEvent<HTMLDivElement>, memo: IMemo) => {
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
  }
  // 수정 종료
  const onClickDoEdit = () => {
    if (inputMemo === editMemo!.memo.content) {
      console.log("내용 수정이 없습니다. 이대로 종료")
    } else {
      console.log("수정 로직을 실행합니다. 해당 메모 수정")
    }
    setInputMemo("")
    setEditMemo(null)
  }

  
  // 태그네임 클릭: Menu Open
  const onClickTagName = () => {
    setIsOpenMenu(true)
  }

  /*Tag Menu: 태그 수정관련 */
  // 수정버튼 클릭
  const onClickEditBtn = () => {
    setIsOpenEditTag(true)
    setIsOpenMenu(false)
  }
  // 수정완료
  const onClickDoEditTag = () => {
    //수정관련로직 후 종료
    setIsOpenEditTag(false)
  }

  /*Tag Menu: 삭제관련 */
  // 삭제버튼 클릭
  const onClickDeleteBtn = () => {
    setIsOpenDeleteMemo(true)
    setIsOpenMenu(false)
  }
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

  /*Tag Menu: 색상관련 */
  // 팔레트 클릭
  const onClickPaletteBtn = () => {
    setIsOpenPalette(true)
    setIsOpenMenu(false)
  }
  const onClickDoEditPalette = () => {
    // 수정 관련로직
    setIsOpenPalette(false)
  }

  
  /* Menu: 창 닫기 */
  const onClickCloseMenuBtn = () => {
    setIsOpenMenu(false)
  }
 
  return(
    <>
      <Header 
        page="memo"
        onClickOtherBtn={onClickOtherBtn}
      />
      <MobileBox height="93%">
        <MemoBox>
          {/* Tag name */}
          <MemoName 
            tag={tag}
            isOpenMenu={isOpenMenu}
            onClickTagName={onClickTagName}
          />
          {/* Tag Name 수정 관련 */}
          { isOpenEditTag && 
            <EditMemoTag 
              tag={tag}
              onClickDoEditTag={onClickDoEditTag}
            />
          }
          {/* 메모 콘텐츠 */}
          <ColBox gap={.25} padding="0" >
            { memoList.map( memo => {
              return(
                <MemoContent
                  memo={memo}
                  onClickMemo={(e) => onClickMemo(e, memo)} 
                />
              )
            })}
          </ColBox>

          {/* 메모 수정 */}
          { editMemo &&
            <MemoInputEdit 
              editMemo={editMemo}
              onClickDoEdit={onClickDoEdit}
              inputMemo={inputMemo}
              onChangeInputMemo={ (e) => setInputMemo(e.target.value) }
            />
          }

          {/* 메모 추가 */}
          { isOpenInputMemo ?
            <MemoInputAdd 
              inputMemo={inputMemo}
              onChangeInputMemo={(e) => setInputMemo(e.target.value)}
              onClickAddConfirm={onClickAddConfirm}
              onClickAddCancel={onClickAddCancel}
            /> :
            <CustomBtn
              size="s"
              bgColor="#dddddd"
              onClick={onClickAddMemoBtn}
            >
              메모 추가
            </CustomBtn>
          }

          {/* 팔레트 */}
          { isOpenPalette &&
            <MemoPalette 
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
        </MemoBox>
      </MobileBox>

      { isOpenDeleteMemo &&
        <MemoDeletePopup 
          onClickCancel={() => setIsOpenDeleteMemo(false)}
          onClickDo={onClickDoDelete}
        />
      }
        { isOpenDeleteConfirm &&
        <MemoDeleteConfirmPopup
          onClickCancel={onClickDoDeleteOnlyTag}
          onClickDo={onClickDoDeleteAll}
        />
      }

    </>
  )
}

export default MemoPage;

const MemoBox = styled(ColBox)`
  position: relative;
  background: ${({theme}) => theme.colors.white};
  height: 100%;
  overflow-y: scroll;
  padding: .5rem;
  gap: .375rem;

  border-radius: .5rem;
  box-shadow: ${({theme}) => theme.boxShadow.main };

    // 스크롤바 설정
  &::-webkit-scrollbar {
    width: 0;
  }
`