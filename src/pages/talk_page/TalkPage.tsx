import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";


import { RowBox } from "../../components/FlexBox";
import Header from "../../components/Header";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan, faThumbTack, faExpand, faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import {  } from "@fortawesome/free-regular-svg-icons";

import { InputText } from "../../components/InputText";
import Text from "../../components/Text"
import TalkInput from "./InputBox/TalkInput";
import { IconBox } from "../../components/IconBox";
import TalkList from "./List/TalkList";
import { Time } from "../../utils/service/time";

// 더미데이터
import { dummyMemos } from "../../utils/data/dummyData";
import { MobileBox } from "../../components/MobileBox";

import { IMemo, ITag } from "../../utils/interface/interface";
import TalkMemu from "./TalkMenu";
import TalkDeletePopup from "./TalkDeletePopup";
import TalkPinn from "./pinn/TalkPinn";
import TalkPinnExpand from "./pinn/TalkPinnExpand";
import TagOptions from "./InputBox/TagOptions";
import TalkInputOption from "./InputBox/TalkInputOption";
import Tag from "../../utils/data/tag_service";
import TalkEditOption from "./InputBox/TalkEditTagName";
import { FbTag } from "../../firebase/firestore_tag_service";

import { firebaseAuth, fireStoreDB } from "../../firebase/firebase_config";
import { FbMemo } from "../../firebase/firestore_memo_service";
import TalkInpuContainer from "./InputBox/TalkInputContainer";
import { User } from "firebase/auth";
import TalkListExpand from "./List/TalkListExpand";
import { MainBtn } from "../../components/Buttons";

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
    await fbMemo.getMemo(viewMemo, setViewMemo)
  }
  // 메모 init 
  useEffect(() => {
    if (!user) return
    if (!viewMemo.length) fbMemo.initLastMemo()
    // getMemoWithPagination(viewMemo, setViewMemo)
  }, [])
  // init 후 맨 아래메모 focus
  // useEffect(() => {
  //   if (viewMemo) focusLastMemo(talkBoxRef)
  // }, [talkBoxRef.current])
  
  /*
    처음실행시 아무것도 없는 빈 화면에서 최상단을 인식하여
    무한스크롤 구현 + 현재의 길이만큼 scroll이동 부분이 자
  */


  // Header 버튼: grid 이동
  const onClickOtherBtn = () => {
    navigate('/grid')
  }

  /*메뉴창 관련*/ 
  // 메뉴 on
  const onClickMemuBtn = (memo: IMemo) => {
    if (editMemo) return
    (selectedMemo === memo) ? setSelectedMemo(null) : setSelectedMemo(memo)
  }
  // 메뉴 off
  const onClickCloseMenuBtn = () => {
    setSelectedMemo(null)
  }
  
  /* Menu: 수정관련 */ 
  // 수정버튼 클릭
  const onClickEditBtn = () => {
    if (!selectedMemo) return
    setEditMemo(selectedMemo)
    setSelectedMemo(null)
  }

  /* Menu: 삭제관련 */
  // 삭제버튼 클릭
  const onClickDeleteBtn = () => {
    setIsOpenDeletePopup(true)
  }
  // 삭제 실행 로직: 념겨줄 인자가 많아서 그대로 유지..
  const deleteMemo = async () => {
    // 메모 삭제 로직
    await fbMemo.deleteMemo(selectedMemo!.id)
    await fbTag.deleteUsedMemo(selectedMemo!)
    // await fbTag.deleteTag(selectedMemo.tagId) // 태그 삭제 관련은 고민해야함

    const newViewMemo = viewMemo.filter(v => v.id !== selectedMemo!.id);
    setViewMemo(newViewMemo);

    if (selectedMemo === pinnedMemo) setPinnedMemo(null)
    setSelectedMemo(null)
    setIsOpenDeletePopup(false)
    alert("삭제되었습니다.");
  }

  /* Menu: 상단 핀: 핀 버튼 클릭 */
   const onClickPinnBtn = () => {
    if (selectedMemo) setPinnedMemo(selectedMemo)
    setSelectedMemo(null)
  }

  /* Menu: 메모 확장 관련: 메모 확장클릭 */
  const onClickExpandBtn = () => {
    // 현재 사용 x
  }

  /* Menu: 메모 이동 : 메모 이동 클릭*/
  const onClicGoMemoBtn = () => {
    navigate(`/memo/${selectedMemo!.tagId}`)
  }

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

    return () => observerRef.current && observerRef.current.disconnect(); // observerRef.current.unobserve()와 동일
  }, [viewMemo]); // viewMemo 변경되면 observer를 새로 지정


  
  return(
    <>
      <Header 
        page="talk"
        onClickOtherBtn={onClickOtherBtn}
      />

      {/* 상단 pinn ui */}
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
        {/* <MainBtn
          onClick={() => getMemoWithPagination(viewMemo, setViewMemo)}
        >
          메모 불러오기
        </MainBtn> */}
        {/* 메모 리스트 표시 */}
        { viewMemo.map((memo, i) => {
          return (
            <TalkList
              key={memo.id}
              tags={tags}
              memo={memo}
              onClickMenuBtn={onClickMemuBtn}
              selectedMemo={selectedMemo}
            />) 
        })}       


        {/* ... 클릭시 메뉴 */}
        { selectedMemo && 
          <TalkMemu 
            onClickEditBtn={onClickEditBtn}
            onClickDeleteBtn={onClickDeleteBtn}
            onClickPinnBtn={onClickPinnBtn}
            onClickExpandBtn={onClickExpandBtn}
            onClicGoMemoBtn={onClicGoMemoBtn}
            onClickCloseMenuBtn={onClickCloseMenuBtn}
          />
        }
      {/* </TalkBox> */}

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
    </TalkBox>

      {/*  삭제 팝업 */}
      { isOpenDeletePopup &&
        <TalkDeletePopup 
          onClickCancel={() => setIsOpenDeletePopup(false)}
          onClickDo={deleteMemo}
        />
      }
    </>
  )
}

export default TalkPage;



const TalkBox = styled(MobileBox)`
  height: 86.5%;
  /* max-height: 86.6%; */
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }
`