import React from "react";
import styled from "styled-components";
import { RowBox } from "../../components/FlexBox";
import TagOptions from "./TagOptions";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {  faHashtag } from "@fortawesome/free-solid-svg-icons";

import { CustomBtn } from "../../components/Buttons";
import { dummyTags } from "../../utils/data/dummyData";

interface ITalkInputOption {
  bottomSpace: number;
}

const TalkInputOption = ( { bottomSpace }: ITalkInputOption ) => {

  const dummyRecent = dummyTags.filter( v => v.id !== "undefined" && v.id !== "timeBomb" )

  return(
    <MenuBox 
      between gap={.1} 
      bottomSpace={bottomSpace}
    >
      <RowBox gap={.25} padding="0" >
        { dummyRecent.map( v => {
          return  <TagOptions 
                    tagColor={v.color} 
                    tagName={v.name} 
                  />
          })
        }
      </RowBox>

    <RowBox gap={.25} padding="0" right>
      <TagOptions 
        tagColor="#679BFF" 
        tagName="추천태그"  
      /> 
      <TagOptions 
        tagColor="#F5F5F5"
        tagName="#"  
      />

    </RowBox>

    </MenuBox>
  )
}

export default TalkInputOption;

// 여기 이제 input 옵션창 해야함..

const MenuBox = styled(RowBox)<{bottomSpace?: number}>`
  display: flex;
  position: fixed;
  align-items: center;
  bottom: ${({bottomSpace}) => bottomSpace ? (bottomSpace-4)+"px": "4rem" } ; // input Box 크기
  left: 50%;
  transform: translate(-50%, 0);
  
  
  padding: .5rem .5rem;
  max-width: 30rem;
  background: white;
`