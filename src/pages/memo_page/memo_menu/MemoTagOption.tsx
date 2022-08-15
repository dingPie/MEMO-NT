import React, { memo } from "react";
import useStore from "../../../store/useStore";

import { RowBox } from "../../../components/FlexBox";

import { IMemo, ITag } from "../../../utils/interface/interface";

import TagOptions from "../../talk_page/InputBox/TagOptions"
import styled from "styled-components";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { faClockFour } from "@fortawesome/free-regular-svg-icons";
import { IconBox } from "../../../components/IconBox";
import { ScrollBox } from "../../../components/ScrollBox";

interface IMemoTagOption  {
  tags: ITag[];
  editMemo: IMemo;
  onClickTagOption: (tagId: string, editMemo: IMemo) => void;
}


const MemoTagOption = ( { 
  tags, 
  editMemo, 
  onClickTagOption 
}: IMemoTagOption ) => {
  
  const { palette } = useStore();
  const recentTags = tags.filter( v => v.id !== "undefined" && v.id !== "toBeDeleted" ) // .slice(0, 3)


  return(
    <InputOptionBox>
      <ScrollBox>
        { recentTags.map( tag =>
          <TagOptions
            key={tag.name}
            onClick={ () => onClickTagOption(tag.id, editMemo)}
            tagColor={palette.getColor(tag)} 
            tagName={tag.name} 
          />
        )}
      </ScrollBox>

      <RowBox gap={.25} padding="0" right>
        <TagIcon
          bgColor="#505050"
          onClick={ () => onClickTagOption("toBeDeleted", editMemo)}
        >
          <Icon icon={faClockFour} color="#FFFFFF" />
        </TagIcon>
        <TagIcon
          bgColor="#F5F5F5"
          onClick={ () => onClickTagOption("undefined", editMemo)}
        >
          <Icon icon={faHashtag} />
        </TagIcon>
      </RowBox>
    </InputOptionBox>
  )
}

export default (MemoTagOption);

const TagIcon = styled(IconBox)`
  align-self: center;
`

 const InputOptionBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 5rem;
  align-items: stretch;
  gap: .5rem;
  
  width: 100%;
  padding: 0 .5rem;
  background: white;
`