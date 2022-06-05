import React from "react";
import styled from "styled-components";

import Text from "../../components/Text";
import { IMemo, ITag } from "../../utils/interface/interface";

interface IMemoContent {
  memo: IMemo;
  onClickMemo?: () => void;
}

const MemoContent = ( { memo }: IMemoContent ) => {


  return(
    <MemoText>
      {memo.content}
    </MemoText>

  )
}

export default MemoContent;

const MemoText = styled(Text)`
  padding: .5rem;
  border-radius: 0;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
`