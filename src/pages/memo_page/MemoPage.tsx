import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Text from "../../components/Text";
import { ColBox, RowBox } from "../../components/FlexBox";
import Header from "../../components/Header";
import { MobileBox } from "../../components/MobileBox";
import { dummyMemos, dummyTags } from "../../utils/data/dummyData";
import MemoName from "./memo_name/MemoName";
import MemoContent from "./memo_content/MemoContent";
import { InputText } from "../../components/InputText";
import { CustomBtn } from "../../components/Buttons";
import MemoMenu from "./menu/MemoMenu";
import EditMemoName from "./memo_name/EditMemoName";
import MemoDeletePopup from "./popup/MemoDeletePopup";
import MemoDeleteConfirmPopup from "./popup/MemoDeleteConfirmPopup";
import MemoPalette from "./menu/MemoPalette";
import TagService from "../../utils/data/tag_service";
import MemoInputEdit from "./memo_content/MemoInputEdit";
import MemoInputAdd from "./memo_content/MemoInputAdd";
import { IMemo, ITag } from "../../utils/interface/interface";
import { FbMemo } from "../../firebase/firestore_memo_service";
import { FbTag } from "../../firebase/firestore_tag_service";
import MemoContentContainer from "./memo_content/MemoContentContainer";

export interface IEditMemo {
  memo: IMemo;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface IMemoPage {
  fbMemo: FbMemo;
  fbTag: FbTag;
  tags: ITag[];
  // tag: ITag;
}

const MemoPage = ( { fbMemo, fbTag, tags }: IMemoPage ) => {

  const tagService = new TagService();
  const navigate = useNavigate();
  const { tagId } = useParams();
  // const tag = useLocation().state as ITag;

  const [tag, setTag] = useState<ITag>(tags.filter(tag => tag.id === tagId )[0]);
  const [memoList, setMemoList] = useState<IMemo[]>([])

  const [isOpenMenu, setIsOpenMenu] = useState(false); // munue on /off
  
  const [isOpenEditTag, setIsOpenEditTag] = useState(false); // edit 창 on/off
  const [isOpenPalette, setIsOpenPalette] = useState(false); // palette창 on/off

  const [isOpenDeleteMemo, setIsOpenDeleteMemo] = useState(false);
  const [isOpenDeleteConfirm, setIsOpenDeleteConfirm] = useState(false);


  useEffect(() => {
    console.log("태그확인", tag)
    if(!tag) return
    getUsedMemo(tag)
  }, [])
  
  const getUsedMemo = async (tag: ITag) => {
    const promiseResult = await fbMemo.getMemoWithTag(tag);
    const result = await Promise.all(promiseResult);
    console.log( "getDoc 결과", result)
    setMemoList(result)
  }


  const onClickOtherBtn = () => {
    navigate(-1)
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
          { tag &&
            <MemoName 
              tag={tag}
              isOpenMenu={isOpenMenu}
              onClickTagName={onClickTagName}
            />
          }
          {/* Tag Name 수정 관련 */}
          { isOpenEditTag && 
            <EditMemoName 
              tag={tag}
              onClickDoEditTag={onClickDoEditTag}
            />
          }
          
          {/* 메모 컨텐츠, 추가, 수정관련  */}
          <MemoContentContainer 
            fbTag={fbTag}
            fbMemo={fbMemo}
            tag={tag}
            memoList={memoList}
            setMemoList={setMemoList}
          />

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
          onClickDoDeleteOnlyTag={onClickDoDeleteOnlyTag}
          onClickDoDeleteAll={onClickDoDeleteAll}
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