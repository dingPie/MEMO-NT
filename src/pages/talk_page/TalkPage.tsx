import React from "react";
import styled from "styled-components";
import { MobileBox } from "../../App";


import { RowBox } from "../../components/FlexBox";
import Header from "../../components/Header";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import { InputText } from "../../components/InputText";
import Text from "../../components/Text"
import TalkInput from "./TalkInput";
import { IconBox } from "../../components/IconBox";
import TalkList from "./TalkList";
import { Time } from "../../utils/service/time";

// 더미데이터
import { dummyMemos } from "../../utils/data/dummyData";

const TalkPage = () => {

  

  
  return(
    <>
      <Header 
        page="talk"
      />
      <MobileBox>

        { dummyMemos.map(memo => {
          return <TalkList memo={memo} />
        })
        }


        <TalkInput />
      </MobileBox>

    </>
  )
}

export default TalkPage;

// const TalkList = styled.div`
//   display: flex;
//   gap: .5rem;
//   width: 100%;
//   padding: 0;

// `

// const TalkTag = styled.div<{color?: string}>`
//   width: 1.75rem;
//   height: 1.75rem;
//   padding: 0 .5rem;
//   background: ${({color}) => color && color};
//   border-radius: 1.75rem;
//   text-align: center;
//   line-height: 1.75rem;
//   font-size: .875rem;
//   font-weight: bold;

// `

// const TalkContent = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: flex-end;
//   padding: 6px;
//   gap: 10px;
//   border-radius: 4px;
//   width: 15rem;
//   /* height: 72px; */
//   font-size: .875rem;
//   background: white;
// `

// const TalkTime = styled.div`
//   display: flex;
//   align-items: flex-end;
//   width: 48px;
//   height: 28px;
  
//   font-weight: 500;
//   font-size: 10px;
//   text-align: center;
//   line-height: 12px;
// `