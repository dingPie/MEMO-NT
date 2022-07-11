import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

import { FbAuth } from "../../firebase/firebase_auth_service";
import { FbTag } from "../../firebase/firestore_tag_service";
import { FbMemo } from "../../firebase/firestore_memo_service";
import { User } from "firebase/auth";

import { MobileBox } from "../../components/MobileBox";
import { ColBox } from "../../components/FlexBox";
import Header from "../../components/Header";

import TalkListContainer from "./List/TalkListContainer";
import TalkInpuContainer from "./InputBox/TalkInputContainer";
import MenuContainer from "./menu/MenuContainer";
import TalkPinnContainer from "./pinn/TalkPinnContainer";
import TalkDeletePopup from "./TalkDeletePopup";

import { IMemo, ITag, IUserInfo } from "../../utils/interface/interface";
import Loading from "../../components/Loading";
import useStore from "../../store/useStore";
import { IApp } from "../../App";


interface ITalkPage extends IApp {
  tags: ITag[];
  userInfo: IUserInfo | null;
}


const TalkPage = ( {  fbMemo, fbTag, fbAuth, tags, userInfo }: ITalkPage ) => {

  const navigate = useNavigate();
  const { loading } = useStore();
  
  const talkBoxRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>();
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);
  const [prevMemoCount, setPrevMemoCount] = useState(0)

  // view Memo caching 필요. memopage 왔다갔다 할 때마다 매번 실행됨.
  const [viewMemo, setViewMemo] = useState<IMemo[]>([]) // 데이터를 load해와서 보여지는 메모
  const [selectedMemo, setSelectedMemo] = useState<IMemo | null>(null); // 선택한 메모(메뉴)
  const [pinnedMemo, setPinnedMemo] = useState<IMemo | null>(null); // 상단 pinn메모
  const [editMemo, setEditMemo] = useState<IMemo | null>(null); // 수정할 메모 (따로 관리하기 위함)
  
  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
  const [toBeDeleteTag, setToBeDeleteTag] = useState<string>('') // 빈태그 체크 및 삭제

  // Header 버튼: grid 이동
  const onClickOtherBtn = useCallback(() => navigate('/grid'), [])
  

  // 메모 불러오기 함수. pagnination 에도 같이 사용
  const doGetMemo = async (viewMemo: IMemo[], setViewMemo?: (v: IMemo[]) => void) => {
    loading.start();
    await fbMemo.getMemo(viewMemo, setViewMemo);
    loading.finish();
  }


  // 메모 init 
  useEffect(() => {
    if (!viewMemo.length && tags.length >= 2) { // 오류를 막기 위한 조건문
      fbMemo.initLastMemo(); // 불러왔던 마지막 메모 초기화
      doGetMemo(viewMemo, setViewMemo);
    }
  }, [tags])

  
  // 핀 메모 세팅 함수
  const doGetPinnedMemo = useCallback( async (userInfo: IUserInfo) => {
    if (!userInfo.pinnedMemo) setPinnedMemo(null)
    else await fbMemo.getPinnedMemo(userInfo.pinnedMemo, setPinnedMemo)
  }, [pinnedMemo])


  // pinnedMemo 세팅
  useEffect(() => {
    if (!userInfo) return
    doGetPinnedMemo(userInfo)
  }, [userInfo])


  // 태그 수정이나 삭제 후 빈 태그 확인, 삭제
  useEffect(() => {
    if (!toBeDeleteTag) return
    const deleteEmptyTag = async (toBeDeleteTag: string) => {
      await fbTag.deleteTag(toBeDeleteTag)
    }
    deleteEmptyTag(toBeDeleteTag)
    setToBeDeleteTag('')
  }, [toBeDeleteTag])


  /* 무한스크롤  */
  const observerOpt = {
    // root: document.querySelector("#scrollArea"), // 겹칠 요소. 설정하지 않으면 브라우저 뷰포트가 기본값.
    rootMargin: "0px",
    threshold: 1.0,
  }
  // 무한스크롤 실행함수 (메모 불러오기)
  const checkIntersect = (entries: any) => { // 객체목록과 관찰자를 파라메터로 받는다.
    entries.forEach( async (entry: any) => {
      if (entry.isIntersecting) { // isIntersecting 은 t/f로 반환됨. 교차되면 true
        doGetMemo(viewMemo, setViewMemo) // 실행할 함수
      }
    });
  }
  // 무한스크롤 useEffect
  useEffect(() => {
    if (!topRef.current || !talkBoxRef.current) return
    observerRef.current = new IntersectionObserver(checkIntersect, observerOpt); // observe 할 요소를 current로 지정,
    observerRef.current.observe(topRef.current);

    // 무한스크롤시 스크롤 유지를 위한 부분 
    const currScrollHieght = talkBoxRef.current.scrollHeight;
    if (viewMemo.length > prevMemoCount + 2) { // 메모가 한번에 2개 이상 바뀌는 건 데이터 불러오기밖에 없으므로 제한사항.
      talkBoxRef.current.scrollTo(0, currScrollHieght - prevScrollHeight)
    } 
    setPrevScrollHeight(currScrollHieght)
    setPrevMemoCount(viewMemo.length)

    return () => {
      observerRef.current && observerRef.current.disconnect(); // observerRef.current.unobserve()와 동일
    } 
  }, [viewMemo]); // viewMemo 변경되면 observer를 새로 지정



  return(
    <>
      
      <Header 
        page="talk"
        onClickOtherBtn={onClickOtherBtn}
      />

      { pinnedMemo && 
        <TalkPinnContainer
          tags={tags}
          memo={pinnedMemo}
          userInfo={userInfo}
          fbAuth={fbAuth}
        />
      }

      <TalkBox
        ref={talkBoxRef}
      >
        <div // 최상단 무한스크롤 인식용
          ref={topRef}
          style={{ height:"1px"}}
        />

        {/* 메모 리스트 표시 */}
        { viewMemo.map((memo, i) => {
          return (
            <TalkListContainer
              key={memo.id}
              tags={tags}
              memo={memo}
              editMemo={editMemo}
              selectedMemo={selectedMemo}
              setSelectedMemo={setSelectedMemo}
            />) 
        })}       
      </TalkBox>
      
      <InputOuterBox>
        {/* Talk menu 관련  */}
        <MenuContainer
          fbAuth={fbAuth}
          fbTag={fbTag} 
          fbMemo={fbMemo}
          selectedMemo={selectedMemo} 
          setSelectedMemo={setSelectedMemo} 
          setEditMemo={setEditMemo} 
          setIsOpenDeletePopup={setIsOpenDeletePopup}
        />

        {/* Talk Input관련 Container */}
        <TalkInpuContainer
          fbMemo={fbMemo}
          fbTag={fbTag}
          tags={tags}
          editMemo={editMemo}
          setEditMemo={setEditMemo}
          viewMemo={viewMemo}
          setViewMemo={setViewMemo}
          talkBoxRef={talkBoxRef}
          setToBeDeleteTag={setToBeDeleteTag}
        />
      </InputOuterBox>

      {/*  삭제 팝업 */}
      { isOpenDeletePopup &&
        <TalkDeletePopup
          fbAuth={fbAuth}
          fbMemo={fbMemo}
          fbTag={fbTag}
          viewMemo={viewMemo}
          setViewMemo={setViewMemo}
          selectedMemo={selectedMemo}
          setSelectedMemo={setSelectedMemo}
          pinnedMemo={pinnedMemo}
          setIsOpenDeletePopup={setIsOpenDeletePopup}
          setToBeDeleteTag={setToBeDeleteTag}
        />
      }

      { loading.isLoading &&
        <Loading />
      }
    </>
  )
}

export default TalkPage;


const TalkBox = styled(MobileBox)`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  padding: .5rem .5rem .25rem .5rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }
`

const InputOuterBox = styled(ColBox)`
  gap: 0;
  padding: 0;
`