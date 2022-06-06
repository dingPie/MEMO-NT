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
import TalkInput from "./TalkInput";
import { IconBox } from "../../components/IconBox";
import TalkList from "./TalkList";
import { Time } from "../../utils/service/time";

// 더미데이터
import { dummyMemos } from "../../utils/data/dummyData";
import { MobileBox } from "../../components/MobileBox";

import { IMemo } from "../../utils/interface/interface";
import TalkMemu from "./TalkMenu";
import TalkDeletePopup from "./TalkDeletePopup";
import TalkPinn from "./TalkPinn";
import TalkPinnExpand from "./TalkPinnExpand";
import TagOptions from "./TagOptions";
import TalkInputOption from "./TalkInputOption";
import Tag from "../../utils/data/tag";
import TalkEditOption from "./TalkEditOption";


const TalkPage = () => {

  const tag = new Tag();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLDivElement>(null)

  const [selectedMemo, setSelectedMemo] = useState<IMemo | null>(null); // 선택한 메모(메뉴)
  const [pinnedMemo, setPinnedMemo] = useState<IMemo | null>(null); // 상단 pinn메모
  const [bottomSpace, setBottomSpace] = useState(0); // option창 bottom 좌표 설정

  const [editMemo, setEditMemo] = useState<IMemo | null>(null); // 수정할 메모 (따로 관리하기 위함)

  const [inputMemo, setInputMemo] = useState('') // 입력중인 memo

  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false)

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
  
  /* input창 관련 */ 
  // input 창이 바뀔때마다 실행하는 로직
  const onChangeInputMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMemo(e.target.value)
    if (inputRef.current) setBottomSpace( inputRef.current.clientHeight )
    // option 추천하는 로직
  }

  /* Menu: 수정관련 */ 
  // 수정버튼 클릭
  const onClickEditBtn = () => {
    if (!selectedMemo) return
    setEditMemo(selectedMemo)
    setInputMemo(selectedMemo.content)
    setSelectedMemo(null)
  }
  // 수정 취소
  const onClickCancelEditMemo = () => {
    setEditMemo(null)
    setInputMemo("")
  }

  /* Menu: 삭제관련 */
  // 삭제버튼 클릭
  const onClickDeleteBtn = () => {
    setIsOpenDeletePopup(true)
  }
  // 삭제 실행 완료
  const deleteMemo = () => {
    alert("삭제되었습니다.")
    setIsOpenDeletePopup(false)
    setSelectedMemo(null)
    // 메모 삭제 로직
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
          memo={pinnedMemo}
          onClickDeletePinn={onClickDeletePinn}
        />
      }
      {/* <TalkPinnExpand /> */}

      <TalkBox>
      {/* 테스트용 */}

        { dummyMemos.map((memo) => {
          return (
            <TalkList
              key={memo.id}
              memo={memo}
              onClickMenuBtn={onClickMemuBtn}
            />) 
        }) }
        
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

      {/* 메모 입력시 등장하는 옵션 */}

      { inputMemo && !editMemo &&
        <TalkInputOption
          bottomSpace={bottomSpace}
        />
      }

      { editMemo &&
        <TalkEditOption
          bottomSpace={bottomSpace}
          editMemo={editMemo}
          onClickCancelEditMemo={onClickCancelEditMemo}
        />
      }

      {/* 메모 입력 input */}
      <TalkInput
        ref={inputRef}
        // defaultValue={}
        inputMemo={inputMemo}
        onChangeInputMemo={(e) => onChangeInputMemo(e)}
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