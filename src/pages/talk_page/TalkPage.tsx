import React, { useState } from "react";
import styled from "styled-components";


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


const TalkPage = () => {

  const [selectedMemo, setSelectedMemo] = useState<IMemo | boolean>(false);

  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false)
  // const [isOpenDeleteConfrim, setIsOpenDeleteConfrim] = useState(false)
  const onClickMemuBtn = (memo: IMemo) => {
    console.log(memo)
    setSelectedMemo(memo)
  }
  // 수정
  const onClickEditBtn = () => {

  }
  // 삭제
  const onClickDeleteBtn = () => {
    setIsOpenDeletePopup(true)
  }
  // 상단 핀
  const onClickPinnBtn = () => {
    
  }
  // 줄임 확장
  const onClickExpandBtn = () => {
    
  }
  // 메모로 이동
  const onClicGoMemoBtn = () => {
    
  }
  // 메뉴 닫기
  const onClickCloseMenuBtn = () => {
    setSelectedMemo(false)
  }

  const deleteMemo = () => {
    alert("삭제되었습니다.")
    setIsOpenDeletePopup(false)
    setSelectedMemo(false)
  }

  
  return(
    <>
      <Header 
        page="talk"
      />
      <TalkPinn />
      {/* <TalkPinnExpand /> */}


      <TalkBox>
        { dummyMemos.map((memo) => {
          return (
            <TalkList
              key={memo.id}
              memo={memo}
              onClickMenuBtn={onClickMemuBtn}
            />
          ) 
        })
        }
           { dummyMemos.map((memo) => {
          return (
            <TalkList
              key={memo.id}
              memo={memo}
              onClickMenuBtn={onClickMemuBtn}
            />
          ) 
        })
        }

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
      <TalkInput />
        { isOpenDeletePopup &&
          <TalkDeletePopup 
            onClickCancel={() => setIsOpenDeletePopup(false) }
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
`