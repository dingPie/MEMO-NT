import React, { useState } from "react";
import styled, { css } from "styled-components";
import { RowBox } from "../../../components/FlexBox";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { IconBox } from "../../../components/IconBox";
import { setTextLine } from "../../../styles/stylesCss";
import { IMemo, ITag } from "../../../utils/interface/interface";
import { dummyTags } from "../../../utils/data/dummyData";
import useStore from "../../../store/useStore";
import { getTagWithMemo, setTalkTag } from "../utils/talk_service";
import { TalkProps } from "../TalkPage";
import TalkPinnExpand from "./TalkPinnExpand";
import TalkPinnDefault from "./TalkPinnDefault";


interface ITalkPinn extends TalkProps {
  memo: IMemo;
  setPinnedMemo: (v: IMemo|null) => void;
}


const TalkPinn = ( { tags, memo, setPinnedMemo }: ITalkPinn ) => {

  const tag = getTagWithMemo(tags, memo);
  const [isExpand, setIsExpand] = useState(false)

  const onClickExpandPinn = () => {
    setIsExpand(true)
  }

  const onClickReducePinn = () => {
    setIsExpand(false)
  }

  const onClickDeletePinn = () => {
    setPinnedMemo(null)
  }


  return(
    <>
      { !isExpand ?
        <TalkPinnDefault
          tag={tag}
          memo={memo}
          onClickDeletePinn={onClickDeletePinn}
          onClickExpandPinn={onClickExpandPinn}
        /> :
        <TalkPinnExpand 
          tag={tag}
          memo={memo}
          onClickDeletePinn={onClickDeletePinn}
          onClickReducePinn={onClickReducePinn}
        />
      }
    </>
  )
}
export default TalkPinn;

export const PinnBox = styled.div<{expand?: boolean}>`
  position: fixed;
  top: 56px;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  gap: .5rem;
  
  max-width: 30rem;
  width: 100%;
  height: 3rem;
  padding: .5rem;
  background: ${({theme}) => theme.colors.primary_blue };


  ${({expand}) => 
    expand && css`
      flex-direction: column ;
      height: auto;
  `}
`

export const PinnBtns = styled(RowBox)`
  align-items: center;
  padding: 0 .25rem;
  gap: .5rem;
  
  height: 2rem;

  background: ${({theme}) => theme.colors.white };
  border-radius: .25rem;
`