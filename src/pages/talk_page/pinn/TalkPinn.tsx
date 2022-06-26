import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { RowBox } from "../../../components/FlexBox";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { IconBox } from "../../../components/IconBox";
import { setTextLine, shrinkY, slideUp, stretchY } from "../../../styles/stylesCss";
import { IMemo, ITag } from "../../../utils/interface/interface";
import { dummyTags } from "../../../utils/data/dummyData";
import useStore from "../../../store/useStore";
import { getTagWithMemo, setTalkTag } from "../utils/talk_service";
import { TalkProps } from "../TalkPage";
import TalkPinnExpand from "./TalkPinnExpand";
import TalkPinnDefault from "./TalkPinnDefault";
import { useNavigate } from "react-router";


interface ITalkPinn extends TalkProps {
  memo: IMemo;
  setPinnedMemo: (v: IMemo|null) => void;
}


const TalkPinn = ( { tags, memo, setPinnedMemo }: ITalkPinn ) => {

  const navigate = useNavigate();
  const tag = getTagWithMemo(tags, memo);
  const [isExpand, setIsExpand] = useState(false);

  // 확장버튼 클릭
  const onClickExpandPinn = () => {
    setTimeout(() => setIsExpand(true), 10);
    //  setIsExpand(true)
  }
  // 줄이기버튼 클릭
  const onClickReducePinn = () => {
    setTimeout(() => setIsExpand(false), 10);
    // setIsExpand(false)
  }
  // 핀 삭제 버튼 클릭
  const onClickDeletePinn = () => {
    setPinnedMemo(null)
  }
  // 메모 이동버튼 클릭
  const onClicGoMemoBtn = () => {
    navigate(`/memo/${memo!.tagId}`)
  }
  

  const [animate, setAnimate] = useState(false);
  const testRef = useRef<HTMLDivElement>(null)
  const [pinnHeight, setPinnHeight] = useState(0)

  useEffect(() => {
    if (!isExpand) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 290);
    } else {
      if (!testRef.current) return
      console.log("이번엔 높이를 구해보자", testRef.current.clientHeight)
      setPinnHeight(testRef.current.clientHeight)
      // setTimeout(() => {
      //   if (!testRef.current) return
      //   console.log("이번엔 높이를 구해보자", testRef.current.clientHeight)
      //   setPinnHeight(testRef.current.clientHeight)
      // }, 10);
    }
  }, [isExpand]);




  return(
    <>
      { (!isExpand && !animate) ?
        <TalkPinnDefault
          ref={testRef}
          tag={tag}
          memo={memo}
          onClickDeletePinn={onClickDeletePinn}
          onClickExpandPinn={onClickExpandPinn}
          isExpand={isExpand}
        /> :
        <TalkPinnExpand
          ref={testRef}
          tag={tag}
          memo={memo}
          onClickDeletePinn={onClickDeletePinn}
          onClickReducePinn={onClickReducePinn}
          onClicGoMemoBtn={onClicGoMemoBtn}
          isExpand={isExpand}
          pinnHeight={pinnHeight}
        />
      }
    </>
  )
}
export default TalkPinn;

export const PinnBox = styled.div<{expand?: boolean, isExpand?: boolean, pinnHeight?: number}>`
  display: flex;
  gap: .5rem;
  
  max-width: 30rem;
  width: 100%;
  height: 3rem;
  padding: .5rem;
  background: ${({theme}) => theme.colors.primary_blue };

  ${({expand, isExpand, pinnHeight}) => 
    expand && css`
      flex-direction: column ;
      height: auto; 
      // 아니 왜 이거만 붙이면 이래;;;;
      animation: ${ !isExpand ? reducePinnBox(pinnHeight!) : expandPinnBox(pinnHeight!)} .29s ;
      animation-delay: .01s;
      /* animation: ${ !isExpand ? shrinkY : stretchY} .3s; */ 
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

export const expandPinnBox = (pinnHeight: number) => keyframes`
  from {
    height: 44px;
  }
  to {
    height: ${pinnHeight}px;
  }
`;

export const reducePinnBox = (pinnHeight: number) => keyframes`
  from {
    height: ${pinnHeight}px;
  }
  to {
    height: 44px;
  }
`;