import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useNavigate } from "react-router";

import { RowBox } from "../../../components/FlexBox";

import { IMemo } from "../../../utils/interface/interface";
import { getTagWithMemo } from "../utils/talk_service";

import { TalkProps } from "../TalkPage";
import TalkPinnExpand from "./TalkPinnExpand";
import TalkPinnDefault from "./TalkPinnDefault";


interface ITalkPinn extends TalkProps {
  memo: IMemo;
  setPinnedMemo: (v: IMemo|null) => void;
}


const TalkPinn = ( { tags, memo, setPinnedMemo }: ITalkPinn ) => {
  
  const navigate = useNavigate();
  const tag = getTagWithMemo(tags, memo);
  const [isExpand, setIsExpand] = useState(false);
  // keyFrame 관련
  const pinnBoxRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const [pinnHeight, setPinnHeight] = useState(0);
  
  // 확장버튼 클릭
  const onClickExpandPinn = () => {
     setIsExpand(true)
  }
  // 줄이기버튼 클릭
  const onClickReducePinn = () => {
    setIsExpand(false)
  }
  // 핀 삭제 버튼 클릭
  const onClickDeletePinn = () => {
    setPinnedMemo(null)
  }
  // 메모 이동버튼 클릭
  const onClicGoMemoBtn = () => {
    navigate(`/memo/${memo!.tagId}`)
  }
  



  useEffect(() => {
    if (!isExpand) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    } else {
      if (!pinnBoxRef.current) return
      console.log("이번엔 높이를 구해보자", pinnBoxRef.current.clientHeight)
      setPinnHeight(pinnBoxRef.current.clientHeight)

      }
  }, [isExpand]);




  return(
    <>
      { (!isExpand && !animate) ?
        <TalkPinnDefault
          ref={pinnBoxRef}
          tag={tag}
          memo={memo}
          onClickDeletePinn={onClickDeletePinn}
          onClickExpandPinn={onClickExpandPinn}
          isExpand={isExpand}
        /> :
        <TalkPinnExpand
          ref={pinnBoxRef}
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
      animation: ${!isExpand ? reducePinnBox(pinnHeight!) : expandPinnBox(pinnHeight!)} .3s ;
      animation-delay: .01s; 
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

 const expandPinnBox = (height: number) => keyframes`
  from {
    height: 44px;
  }
  to {
    height: ${height}px;
  }
  `;

 const reducePinnBox = (height: number) => keyframes`
  from {
    height: ${height}px;
  }
  to {
    height: 44px;
  }
`;