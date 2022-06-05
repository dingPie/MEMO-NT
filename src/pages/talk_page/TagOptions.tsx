import React from "react";
import styled from "styled-components";
import Text from '../../components/Text'

import { CustomBtn } from "../../components/Buttons";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

interface ITagOptions {
  tag: string;
}

const TagOptions = ( { tag }: ITagOptions ) => {


  return(
    <>
      <RecomandTag
        color="white"
        bgColor="#679BFF"
        padding=".25rem .5rem"
        radius={1}
        
      >
        {tag}
      </RecomandTag>
    </>
  )
}

export default TagOptions;

// 여기 이제 input 옵션창 해야함..

const RecomandTag = styled(CustomBtn)`
  max-width: 4.5rem;
  min-width: 2rem;

  // overflow속성
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: nowrap

`