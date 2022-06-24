import React from "react";
import styled from "styled-components";
import { RowBox } from "../../../components/FlexBox";
import TagOptions from "./TagOptions";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {  faHashtag,  } from "@fortawesome/free-solid-svg-icons";

import { CustomBtn } from "../../../components/Buttons";
import { dummyTags } from "../../../utils/data/dummyData";
import { TalkProps } from "../TalkPage";
import useStore from "../../../store/useStore";
import { ITag } from "../../../utils/interface/interface";
import { IconBox } from "../../../components/IconBox";

interface ITalkInputOption extends TalkProps {
  recommTag: ITag | undefined;
  onClickTagOption: (v?: string) => void;
}

const TalkInputOption = ( { tags, recommTag, onClickTagOption }: ITalkInputOption ) => {
  
  const { palette } = useStore();
  const recentTags = tags.filter( v => v.id !== "undefined" && v.id !== "toBeDeleted" ).slice(0, 3)
  // firebase에서 sort시, sort 된 옵션으로 불러와진다!

  return(
    <RowBox
      align="center"
      padding=".5rem"
      bgColor="white"
    >
      <RowBox gap={.25} padding="0" >
        { recentTags.map( tag =>
          <TagOptions
            key={tag.id}
            onClick={ () => onClickTagOption(tag.name)}
            tagColor={palette.getColor(tag)} 
            tagName={tag.name} 
          />
        )}
      </RowBox>

    <RowBox gap={.25} padding="0" right>
      { recommTag &&
        <TagOptions 
          onClick={() => onClickTagOption(recommTag.name)}
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

    </RowBox>
  )
}

export default TalkInputOption;