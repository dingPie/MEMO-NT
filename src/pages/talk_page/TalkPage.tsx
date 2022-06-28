import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

import { FbTag } from "../../firebase/firestore_tag_service";
import { FbMemo } from "../../firebase/firestore_memo_service";
import { User } from "firebase/auth";

import { MobileBox } from "../../components/MobileBox";
import { ColBox } from "../../components/FlexBox";
import Header from "../../components/Header";

import TalkList from "./List/TalkList";
import TalkDeletePopup from "./TalkDeletePopup";
import TalkPinn from "./pinn/TalkPinn";
import TalkInpuContainer from "./InputBox/TalkInputContainer";
import MenuContainer from "./menu/MenuContainer";

import { IMemo, ITag } from "../../utils/interface/interface";
import Loading from "../../components/Loading";
import useStore from "../../store/useStore";


interface ITalkPage {
  user: User | null;
  tags: ITag[];
  setTags: (v: ITag[]) => void;
  fbMemo: FbMemo;
  fbTag: FbTag;
}

export interface TalkProps {
  tags: ITag[];
}


const TalkPage = ( { user, tags, setTags, fbMemo, fbTag, }: ITalkPage ) => {

  const navigate = useNavigate();
  const { loading } = useStore();

  const talkBoxRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>();
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);
  const [prevMemoCount, setPrevMemoCount] = useState(0)

  const [viewMemo, setViewMemo] = useState<IMemo[]>([]) // 데이터를 load해와서 보여지는 메모
  const [selectedMemo, setSelectedMemo] = useState<IMemo | null>(null); // 선택한 메모(메뉴)
  const [pinnedMemo, setPinnedMemo] = useState<IMemo | null>(null); // 상단 pinn메모
  const [editMemo, setEditMemo] = useState<IMemo | null>(null); // 수정할 메모 (따로 관리하기 위함)

  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);


  // 메모 불러오기
  const getMemoWithPagination = async (viewMemo: IMemo[], setViewMemo?: (v: IMemo[]) => void) => {
    // loading.start();
    await fbMemo.getMemo(viewMemo, setViewMemo)
    // loading.finish();
  }
  // 메모 init 
  useEffect(() => {
    if (!user) return
    if (!viewMemo.length) fbMemo.initLastMemo()
  }, [])


  // Header 버튼: grid 이동
  const onClickOtherBtn = useCallback(() => {
    navigate('/grid')
  },[])


  /* 무한스크롤  */
  const observerOpt = {
    // root: document.querySelector("#scrollArea"), // 겹칠 요소. 설정하지 않으면 브라우저 뷰포트가 기본값.
    rootMargin: "0px",
    threshold: 1.0,
  }
  
  const checkIntersect = (entries: any) => { // 객체목록과 관찰자를 파라메터로 받는다.
    entries.forEach( async (entry: any) => {
      if (entry.isIntersecting) { // isIntersecting 은 t/f로 반환됨. 교차되면 true
        getMemoWithPagination(viewMemo, setViewMemo) // 실행할 함수
      }
    });
  }

  useEffect(() => {
    if (!topRef.current || !talkBoxRef.current) return
    // isLoading true
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



  // 메모 삭제
  const deleteMemo = async () => {
    loading.start();
    await fbMemo.deleteMemo(selectedMemo!.id)
    await fbTag.deleteUsedMemo(selectedMemo!)
    // await fbTag.deleteTag(selectedMemo.tagId) // 태그 삭제 관련은 고민해야함

    const newViewMemo = viewMemo.filter(v => v.id !== selectedMemo!.id);
    setViewMemo(newViewMemo);

    if (selectedMemo === pinnedMemo) setPinnedMemo(null)
    setSelectedMemo(null)
    setIsOpenDeletePopup(false)
    // alert("삭제되었습니다.");
    loading.finish();
  }
  


  return(
    <MobileBox>
      
      <Header 
        page="talk"
        onClickOtherBtn={onClickOtherBtn}
      />
      {/* 상단 pinn ui, absoulte로 적용되어있음 */}
      { pinnedMemo && 
        <TalkPinn
          tags={tags}
          memo={pinnedMemo}
          setPinnedMemo={setPinnedMemo}
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
            <TalkList
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
          fbTag={fbTag} 
          fbMemo={fbMemo} 
          viewMemo={viewMemo} 
          selectedMemo={selectedMemo} 
          pinnedMemo={pinnedMemo} 
          setSelectedMemo={setSelectedMemo} 
          setEditMemo={setEditMemo} 
          setPinnedMemo={setPinnedMemo} 
          setViewMemo={setViewMemo}
          isOpenDeletePopup={isOpenDeletePopup}
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
        />
      </InputOuterBox>

      {/*  삭제 팝업 */}
      { isOpenDeletePopup &&
        <TalkDeletePopup 
          onClickCancel={() => setIsOpenDeletePopup(false)}
          onClickDo={deleteMemo}
        />
      }

    </MobileBox>
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