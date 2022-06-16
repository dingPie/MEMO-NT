import React from "react";
import styled from "styled-components";
import { RowBox } from "../../../components/FlexBox";
import TagOptions from "./TagOptions";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {  faHashtag } from "@fortawesome/free-solid-svg-icons";

import { CustomBtn } from "../../../components/Buttons";
import { dummyTags } from "../../../utils/data/dummyData";
import { TalkProps } from "../TalkPage";
import useStore from "../../../store/useStore";
import { ITag } from "../../../utils/interface/interface";

interface ITalkInputOption extends TalkProps {
  bottomSpace: number;
  recommTag: ITag | undefined;
  onClickTagOption: (v?: string) => void;
}

const TalkInputOption = ( { tags, recommTag, bottomSpace, onClickTagOption }: ITalkInputOption ) => {

  const recentTags = tags.filter( v => v.id !== "undefined" && v.id !== "toBeDeleted" ).slice(0, 3)
  const { palette } = useStore();
  // const tag = tags.filter(v => v.id === editMemo.tagId)[0]

  return(
    <MenuBox 
      between gap={.1} 
      bottomSpace={bottomSpace}
    >
      <RowBox gap={.25} padding="0" >
        { tags.slice(0, 3).map( tag => // 추후 recentTags로 변경
          <TagOptions 
            onClick={ () => onClickTagOption(tag.name)}
            tagColor={palette.getColor(tag)} 
            tagName={tag.name} 
          />
        )}
      </RowBox>

    <RowBox gap={.25} padding="0" right>
      
      { recommTag &&
        <TagOptions 
          onClick={ () => onClickTagOption(recommTag.name)}
          tagColor={palette.getColor(recommTag)} 
          tagName={recommTag.name}  // 태그 추천 관련 로직 적용
        /> 
      }
      <TagOptions
        onClick={ () => onClickTagOption("")}
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