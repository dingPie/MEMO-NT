import React, { useLayoutEffect, useState } from "react";
import useStore from "../../store/useStore";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

// components
import Header from "../../components/Header";
import { MobileBox } from "../../components/MobileBox";
import { ColBox, RowBox } from "../../components/FlexBox";
import Loading from "../../components/Loading";

// utils
import { IMemo, ITag, IUserInfo } from "../../utils/interface/interface";
import { FbMemo } from "../../firebase/firestore_memo_service";
import { FbTag } from "../../firebase/firestore_tag_service";
import { FbAuth } from "../../firebase/firebase_auth_service";

// Memo Conponents
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

export interface MemoProps {
  fbMemo: FbMemo;
  fbTag: FbTag;
  tag: ITag;
}

interface IMemoPage {
  fbAuth: FbAuth;
  fbMemo: FbMemo;
  fbTag: FbTag;
  tags: ITag[];
  // tag: ITag;
  userInfo: IUserInfo | null;
}

const MemoPage = ( { fbMemo, fbAuth, fbTag, tags, userInfo }: IMemoPage ) => {

  const navigate = useNavigate();
  const { tagId } = useParams();
  const { loading } = useStore();

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
      <>
      <Header 
        page="memo"
        onClickOtherBtn={onClickOtherBtn}
      />
      <OuterBox>
        <MemoBox className="test">
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
              fbAuth={fbAuth}
              fbTag={fbTag}
              fbMemo={fbMemo}
              tag={tag}
              memoList={memoList}
              setMemoList={setMemoList}
              isOpenMenu={isOpenMenu}
              userInfo={userInfo}
            />
          </>
          }
        </MemoBox>
      </OuterBox>
      {tag &&
          <MemoMenuContainer
            fbTag={fbTag}
            fbMemo={fbMemo}
            tag={tag}
            isOpenMenu={isOpenMenu}
            setIsOpenMenu={setIsOpenMenu}
            setIsOpenDeleteMemo={setIsOpenDeleteMemo}
            setIsOpenEditTag={setIsOpenEditTag}
          />
      }
        <MemoDeletePopupContainer
          fbAuth={fbAuth} 
          fbTag={fbTag}
          fbMemo={fbMemo}
          userInfo={userInfo}
          tag={tag}
          isOpenDeleteMemo={isOpenDeleteMemo}
          setIsOpenDeleteMemo={setIsOpenDeleteMemo}
        />

      { loading.isLoading &&
        <Loading />
      }
      </>
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
  height: 100%;
  &::-webkit-scrollbar {
    width: 0;
  }
`