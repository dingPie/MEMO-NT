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
import EditMemoName from "./EditMemoName";
import MemoDeletePopup from "./MemoDeletePopup";
import MemoDeleteConfirmPopup from "./MemoDeleteConfirmPopup";
import MemoPalette from "./MemoPalette";


const MemoPage = () => {

  const { tagId } = useParams();
  const navigate = useNavigate();
  const tag = dummyTags.filter(v => v.id === tagId )[0]
  const memoList = tag.memo.map( memoId => dummyMemos.filter(memo => memo.id === memoId)[0])

  const [isOpenDeleteMemo, setIsOpenDeleteMemo] = useState(false);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false);
  
  const onClickDoDelete = () => {
    setIsOpenDeleteMemo(false)
    setIsOpenDeleteConfirm(true)
  }
  const onClickDoDeleteAll = () => {
    setIsOpenDeleteConfirm(false)
    // 전체 삭제 로직 실행
    navigate('/grid')
  }
  
  const onClickDoDeleteOnlyTag = () => {
    setIsOpenDeleteConfirm(false)
    // 태그만 삭제 로직 실행
    navigate('/grid')
  }
 
  return(
    <>
      <Header page="memo" />
      <MobileBox height="93%">
        <MemoBox>

          <MemoName 
            tag={tag}
          />
          
          <EditMemoName 
            tag={tag}
          />

          <ColBox gap={.25} padding="0" >

            { memoList.map( memo => {
              return(
                <MemoContent memo={memo} />
              )
            })}
          </ColBox>

            <InputText
              shadow
            />

            <CustomBtn
              size="s"
              bgColor="#dddddd"
            >
              메모 추가
            </CustomBtn>

            {/* 팔레트 */}
            <MemoPalette />
            {/* 메뉴 */}
            <MemoMenu
              onClickDeleteBtn={() => setIsOpenDeleteMemo(true)}
            />

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