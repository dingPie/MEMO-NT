import React, { useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useNavigate } from "react-router";

import { RowBox } from "../../../components/FlexBox";

import { FbAuth } from "../../../firebase/firebase_auth_service";
import { IMemo, ITag, IUserInfo } from "../../../utils/interface/interface";
import { getTagWithMemo } from "../utils/talk_service";

import TalkPinnExpand from "./TalkPinnExpand";
import TalkPinnDefault from "./TalkPinnDefault";


interface ITalkPinnContainer {
  tags: ITag[];
  memo: IMemo | null;
  userInfo: IUserInfo | null;
  fbAuth: FbAuth;
}


const TalkPinnContainer = ( {tags, fbAuth, memo }: ITalkPinnContainer ) => {
  
  const navigate = useNavigate();
  const tag = getTagWithMemo(tags, memo!);
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
  const onClickDeletePinn =  async () => {
    await fbAuth.setPinnedMemo('')
    // setPinnedMemo(null)
  }

  // 메모 이동버튼 클릭
  const onClicGoMemoBtn = () => {
    navigate(`/memo/${memo!.tagId}`)
  }

  // 애니메이션 관련, 잠시 사용 X
   
  // useEffect(() => {
  //   if (!isExpand) {
  //     setAnimate(true);
  //     setTimeout(() => setAnimate(false), 300);
  //   } else {
  //     if (!pinnBoxRef.current) return
  //     console.log("이번엔 높이를 구해보자", pinnBoxRef.current.clientHeight)
  //     setPinnHeight(pinnBoxRef.current.clientHeight)

  //     }
  // }, [isExpand]);


  return(
    <>
      { (!isExpand && !animate) ?
        <TalkPinnDefault
          ref={pinnBoxRef}
          tag={tag}
          memo={memo!}
          onClickDeletePinn={onClickDeletePinn}
          onClickExpandPinn={onClickExpandPinn}
          isExpand={isExpand}
        /> :
        <TalkPinnExpand
          ref={pinnBoxRef}
          tag={tag}
          memo={memo!}
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
export default TalkPinnContainer;


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
      /* animation: ${!isExpand ? reducePinnBox(pinnHeight!) : expandPinnBox(pinnHeight!)} .3s ;
      animation-delay: .01s;  */
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