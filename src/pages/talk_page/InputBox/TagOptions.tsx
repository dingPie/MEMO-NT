import React from "react";
import styled from "styled-components";

import { CustomBtn } from "../../../components/Buttons";

import { setTextLine } from "../../../styles/stylesCss";

interface ITagOptions {
  tagColor: string;
  tagName: string;
  onClick?: (v: any) => void;
}

const TagOptions = ( { 
  tagColor, 
  tagName, 
  onClick 
}: ITagOptions ) => {


  return(
      <TagOptionBox
        onClick={onClick}
        bgColor={tagColor}
        padding=".25rem .5rem"
        radius={1}
        whiteSpace={"nowrap"}
        end
      >
        {tagName}
      </TagOptionBox>
  )
}

export default TagOptions;

// 여기 이제 input 옵션창 해야함..

const TagOptionBox = styled(CustomBtn)<{whiteSpace?: string, end?:boolean}>`
  flex: 0 0 auto;
  justify-self: ${({end}) => end && "flex-end" };
  align-self: center;

  min-width: 2rem;
  max-width: 5.5rem;
  height: 1.75rem;

  ${setTextLine};
`