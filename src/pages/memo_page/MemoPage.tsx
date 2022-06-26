import React, { useEffect, useLayoutEffect, useState } from "react";
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
import MemoNameContainer from "./memo_name/MemoNameContainer";
import MemoMenuContainer from "./menu/MemoMenuContainer";
import MemoDeletePopupContainer from "./popup/MemoDeletePopupContainer";

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

export interface MemoProps {
  fbMemo: FbMemo;
  fbTag: FbTag;
  tag: ITag;
}

const MemoPage = ( { fbMemo, fbTag, tags }: IMemoPage ) => {

  const navigate = useNavigate();
  const { tagId } = useParams();

  const [tag, setTag] = useState<ITag>(tags.filter(tag => tag.id === tagId )[0]);
  const [memoList, setMemoList] = useState<IMemo[]>([])

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenEditTag, setIsOpenEditTag] = useState(false);
  const [isOpenDeleteMemo, setIsOpenDeleteMemo] = useState(false);

  useLayoutEffect(() => {
    if(!tag) return
    getUsedMemo(tag)
  }, [])

  useLayoutEffect(() => {
    setTag(tags.filter(tag => tag.id === tagId )[0])
  }, [tags])
  
  // 현재 태그에서 사용 할 메모 가져오기
  const getUsedMemo = async (tag: ITag) => {
    const promiseResult = await fbMemo.getMemoWithTag(tag);
    const result = await Promise.all(promiseResult);
    setMemoList(result)
  }

  // 뒤로가기 버튼 (Header)
  const onClickOtherBtn = () => {
    navigate(-1)
  }

  // 태그네임 클릭: Menu Open
  const onClickTagName = () => {
    setIsOpenMenu(true)
  }
 
  return(
      <MobileBox>
      <Header 
        page="memo"
        onClickOtherBtn={onClickOtherBtn}
      />
      <OuterBox>
        <MemoBox>
          {tag &&
          <>
            <MemoNameContainer
              fbTag={fbTag}
              fbMemo={fbMemo} 
              tag={tag}
              isOpenMenu={isOpenMenu}
              isOpenEditTag={isOpenEditTag}
              setIsOpenEditTag={setIsOpenEditTag}
              onClickTagName={onClickTagName}
            />
            <MemoContentContainer 
              fbTag={fbTag}
              fbMemo={fbMemo}
              tag={tag}
              memoList={memoList}
              setMemoList={setMemoList}
              isOpenMenu={isOpenMenu}
            />
            <MemoMenuContainer
              fbTag={fbTag}
              fbMemo={fbMemo}
              tag={tag}
              isOpenMenu={isOpenMenu}
              setIsOpenMenu={setIsOpenMenu}
              setIsOpenDeleteMemo={setIsOpenDeleteMemo}
              setIsOpenEditTag={setIsOpenEditTag}
            />
          </>
          }
        </MemoBox>
      </OuterBox>

        <MemoDeletePopupContainer 
          fbTag={fbTag}
          fbMemo={fbMemo}
          tag={tag}
          isOpenDeleteMemo={isOpenDeleteMemo}
          setIsOpenDeleteMemo={setIsOpenDeleteMemo}
        />
      </MobileBox>
  )
}

export default MemoPage;

const MemoBox = styled(ColBox)`
  background: ${({theme}) => theme.colors.white};
  gap: .375rem;
  
  height: 100%;
  padding: .5rem;
  overflow-y: scroll;
  border-radius: .5rem;
  box-shadow: ${({theme}) => theme.boxShadow.main };

  &::-webkit-scrollbar {
    width: 0;
  }
`

const OuterBox = styled.div`
  padding: .5rem;
  overflow-y: scroll;
`