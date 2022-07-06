import React from "react";
import styled from "styled-components";

import { CustomBtn } from "../../../components/Buttons";

import { setTextLine } from "../../../styles/stylesCss";

interface ITagOptions {
  tagColor: string;
  tagName: string;
  maxWidth?: number;
  onClick?: (v: any) => void;
  end?: boolean;
}

const TagOptions = ( { end, tagColor, tagName, onClick }: ITagOptions ) => {


  return(
    <>
      <RecomandTag
        onClick={onClick}
        bgColor={tagColor}
        padding=".25rem .5rem"
        radius={1}
        whiteSpace={"nowrap"}
        end={end}
      >
        {tagName}
      </RecomandTag>
    </>
  )
}

export default TagOptions;

// 여기 이제 input 옵션창 해야함..

const RecomandTag = styled(CustomBtn)<{whiteSpace?: string, end?:boolean}>`
  flex: 0 0 auto;
  justify-self: ${({end}) => end && "end" };
  align-self: center;

  min-width: 2rem;
  max-width: 5.5rem;
  height: 1.75rem;

  ${setTextLine};
`