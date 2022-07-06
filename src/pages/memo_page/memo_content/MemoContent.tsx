import React, { memo } from "react";
import styled from "styled-components";

import Text from "../../../components/Text";
import { IMemo, ITag } from "../../../utils/interface/interface";

interface IMemoContent {
  memo: IMemo;
  onClickMemo?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const MemoContent = ( { memo, onClickMemo }: IMemoContent ) => {


  return(
    <MemoText
      onClick={onClickMemo}
    >
      {memo.content}
    </MemoText>
  )
}

export default memo(MemoContent);

const MemoText = styled(Text)`
  padding: .5rem;
  border-radius: 0;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  white-space: pre-wrap;
`