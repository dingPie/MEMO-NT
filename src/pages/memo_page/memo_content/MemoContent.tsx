import React, { useRef } from "react";
import styled from "styled-components";

import Text from "../../../components/Text";
import { IMemo, ITag } from "../../../utils/interface/interface";

interface IMemoContent {
  memo: IMemo;
  onClickMemo?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const MemoContent = ( { memo, onClickMemo }: IMemoContent ) => {

  // const inputRef = useRef<HTMLDivElement>(null)

  // const resize = (ref: React.RefObject<HTMLDivElement>) => {
  //   if (!ref.current || noResize) return
  //   ref.current.style.height = "auto" ; // 줄어들때 먼저 설정
  //   ref.current.style.height = ref.current.scrollHeight +"px";
  //   console.log("높이설정", ref.current.scrollHeight)
  // }

  return(
    <MemoText
      onClick={onClickMemo}
    >
      {memo.content}
    </MemoText>
  )
}

export default MemoContent;

const MemoText = styled(Text)`
  padding: .5rem;
  border-radius: 0;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  white-space: pre-wrap;
`