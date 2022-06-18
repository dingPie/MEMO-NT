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
import TalkInpuContainer from "./InputBox/TalkInpuContainer";
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

  const [viewMemo, setViewMemo] = useState<IMemo[]>([]) // 데이터를 load해와서 보여지는 메모
  const [selectedMemo, setSelectedMemo] = useState<IMemo | null>(null); // 선택한 메모(메뉴)
  const [pinnedMemo, setPinnedMemo] = useState<IMemo | null>(null); // 상단 pinn메모
  const [editMemo, setEditMemo] = useState<IMemo | null>(null); // 수정할 메모 (따로 관리하기 위함)

  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);

  // 시작시 마지막 메모 포커스 
  // 메모가 로드되지 않았을 때 스크롤 길이를 판단하면서 비동기처리 오류가난다.
  const focusLast = () => {
		if (!talkBoxRef.current) return
    const scrollHeight = talkBoxRef.current.scrollHeight
    talkBoxRef.current!.scroll(({ top: scrollHeight, left: 0, behavior: "smooth" }))
    console.log("길이검사", scrollHeight)
	}

  useEffect(() => {
    if (!user) return
    fbMemo.initLastMemo()
    loadPaginationMemo(viewMemo, setViewMemo)
  }, [])

  useEffect(() => {
    if (!viewMemo) return
    focusLast()
  }, [viewMemo])
  // 매번 이거 작동하는것도 스트레스고
  // memo 불러오기 작동시마다 재랜더링됨
  // 해당문제 해결해야 함.
  

  const loadPaginationMemo = async (viewMemo: IMemo[], setViewMemo?: (v: IMemo[]) => void) => {
    await fbMemo.getMemo(viewMemo, setViewMemo)
  } 
  

  // Header 버튼: grid 이동
  const onClickOtherBtn = () => {
    navigate('/grid')
  }

  /*메뉴창 관련*/ 
  // 메뉴 on
  const onClickMemuBtn = (memo: IMemo) => {
    console.log("선택한 메모:", memo)
    if (selectedMemo === memo) {
      setSelectedMemo(null)
    } else {
      setSelectedMemo(memo)
    }
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
  // 삭제 실행 로직
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

  /* Menu: 상단 핀 관련 */
  // 핀 버튼 클릭
   const onClickPinnBtn = () => {
    if (selectedMemo) setPinnedMemo(selectedMemo)
    setSelectedMemo(null)
  }
  // 핀 삭제
  const onClickDeletePinn = () => {
    setPinnedMemo(null)
  }

  /* Menu: 메모 확장 관련 */
  // 메모 확장클릭
  const onClickExpandBtn = () => {
    
  }

  /* Menu: 메모 이동 관련 */
  // 메모 이동 클릭
  const onClicGoMemoBtn = () => {
    navigate(`/memo/${selectedMemo!.tagId}`)
  }




  
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
          onClickDeletePinn={onClickDeletePinn}
        />
      }

      <TalkBox
        ref={talkBoxRef}
      >
        <MainBtn
          onClick={() => loadPaginationMemo(viewMemo, setViewMemo)}
        >
          메모 불러오기
        </MainBtn>
        {/* 메모 리스트 표시 */}
        { viewMemo.map((memo) => {
          return (
            <TalkList
              key={memo.id}
              tags={tags}
              memo={memo}
              onClickMenuBtn={onClickMemuBtn}
              selectedMemo={selectedMemo}
            />) 
        })}       

        {/* { viewMemo.map((memo) => {
          return (
            <TalkList
              key={memo.id}
              tags={tags}
              memo={memo}
              onClickMenuBtn={onClickMemuBtn}
              selectedMemo={selectedMemo}
            />) 
        })}       { viewMemo.map((memo) => {
          return (
            <TalkList
              key={memo.id}
              tags={tags}
              memo={memo}
              onClickMenuBtn={onClickMemuBtn}
              selectedMemo={selectedMemo}
            />) 
        })} */}
          
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
      </TalkBox>

      {/* Talk Input관련 Container */}
      <TalkInpuContainer
        fbMemo={fbMemo}
        fbTag={fbTag}
        tags={tags}
        editMemo={editMemo}
        setEditMemo={setEditMemo}
        viewMemo={viewMemo}
        setViewMemo={setViewMemo}
      />

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
  overflow-y: scroll ;

  &::-webkit-scrollbar {
    width: 0;
  }
`