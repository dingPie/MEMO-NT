import React from "react";
import styled from "styled-components";
import { RowBox } from "../../components/FlexBox";
import TagOptions from "./TagOptions";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {  faHashtag } from "@fortawesome/free-solid-svg-icons";

import { CustomBtn } from "../../components/Buttons";

const TalkInputOption = () => {

  const dummyRecent = ["테스트 태그 1", "테스트 2", "태그3 "]

  return(
    <MenuBox between gap={.1} >
      <RowBox gap={.25} right>
        { dummyRecent.map( v => {
          return <TagOptions tag={v} />
          })
        }
      </RowBox>

    <RowBox gap={.25} right>
      <TagOptions tag={"추천 태그"} />
      <TagOptions tag={"#"} />

    </RowBox>

    </MenuBox>
  )
}

export default TalkInputOption;

// 여기 이제 input 옵션창 해야함..

const MenuBox = styled(RowBox)`
  display: flex;
  position: fixed;
  align-items: center;
  bottom: 4rem; // input Box 크기
  left: 50%;
  transform: translate(-50%, 0);
  
  
  padding: .25rem;
  max-width: 30rem;
  background: white;
`