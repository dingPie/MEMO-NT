import React from "react";
import styled from "styled-components";
import Text from '../../../components/Text'

import { CustomBtn } from "../../../components/Buttons";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { setTextLine } from "../../../styles/stylesCss";
import { ITag } from "../../../utils/interface/interface";

interface ITagOptions {
  tagColor: string;
  tagName: string;
  maxWidth?: number;
  onClick?: (v: any) => void;
}

const TagOptions = ( { tagColor, tagName, maxWidth, onClick }: ITagOptions ) => {


  return(
    <>
      <RecomandTag
        onClick={onClick}
        bgColor={tagColor}
        padding=".25rem .5rem"
        radius={1}
        maxWidth={maxWidth}
      >
        {tagName}
      </RecomandTag>
    </>
  )
}

export default TagOptions;

// 여기 이제 input 옵션창 해야함..

const RecomandTag = styled(CustomBtn)<{maxWidth?: number}>`
  max-width: ${({maxWidth}) => maxWidth ? maxWidth +"rem" : "4.5rem" };
  min-width: 2rem;

  ${setTextLine}
  white-space: nowrap;

  // overflow속성, 숨김
  /* display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical; */
`