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
import MemoInput from "./MemoInput";


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
  const [inputMemo, setInputMemo] = useState("")
  const [inputTag, setInputTag] = useState("")

  const [isOpenDeleteMemo, setIsOpenDeleteMemo] = useState(false);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false);


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

  // 태그네임 클릭
  const onClickTagName = () => {
    setIsOpenMenu(true)
  }
  
  /* Menu: 수정관련 */
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

  /* Menu: 삭제관련 */
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

  /* Menu: 색상관련 */
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
      <Header page="memo" />
      <MobileBox height="93%">
        <MemoBox>

          <MemoName 
            tag={tag}
            isOpenMenu={isOpenMenu}
            onClickTagName={onClickTagName}
          />
          
          { isOpenEditTag && 
            <EditMemoTag 
              tag={tag}
              onClickDoEditTag={onClickDoEditTag}
            />
          }

          <ColBox gap={.25} padding="0" >

            { memoList.map( memo => {
              return(
                <MemoContent
                 memo={memo} 
                />
              )
            })}
          </ColBox>

          {/* <MemoInputEdit /> */}

          {/* 메모 추가 관련 */}
          { isOpenInputMemo ?
            <MemoInput 
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

const MemoText = styled(Text)`
  padding: .5rem;
  border-radius: 0;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
`