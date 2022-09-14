import React, { memo, useCallback } from "react";
import styled, { css } from "styled-components";

import {
  expandPinnBox,
  reducePinnBox,
  stretchY,
} from "../../../styles/stylesCss";
import { IMemo, ITag } from "../../../utils/interface/interface";
import { getTagWithMemo } from "../utils/talk_service";

import TalkListaDefault from "./TalkListaDefault";
import TalkListExpand from "./TalkListExpand";

interface ITalkListContainer {
  tags: ITag[];
  memo: IMemo;
  editMemo: IMemo | null;
  selectedMemo: IMemo | null;
  setSelectedMemo: (memo: IMemo | null) => void;
}

const TalkListContainer = ({
  tags,
  memo,
  editMemo,
  selectedMemo,
  setSelectedMemo,
}: ITalkListContainer) => {
  const tag = getTagWithMemo(tags, memo);

  const onClickMenuBtn = useCallback(
    (memo: IMemo) => {
      if (editMemo) return;
      selectedMemo === memo ? setSelectedMemo(null) : setSelectedMemo(memo);
    },
    [selectedMemo, editMemo],
  );

  return (
    <>
      {selectedMemo !== memo ? (
        <TalkListaDefault
          tag={tag}
          memo={memo}
          onClickMenuBtn={onClickMenuBtn}
        />
      ) : (
        <TalkListExpand tag={tag} memo={memo} onClickMenuBtn={onClickMenuBtn} />
      )}
    </>
  );
};

export default memo(TalkListContainer);

export const TalkListBox = styled.div<{
  expand?: boolean;
  listHeight?: number;
}>`
  display: grid;
  grid-template-columns: ${({ expand }) =>
    expand ? "1fr 3rem 1.75rem" : "1.75rem 1fr 3rem 1.75rem"};
  gap: 0.5rem;
  width: 100%;
  padding: 0;
  margin-bottom: 0.5rem;

  ${({ expand, listHeight }) =>
    expand &&
    css`
      /* animation: ${stretchY} .2s ease-in-out; */
      /* animation-delay: .01s ;
      animation: ${!expand
        ? reducePinnBox(listHeight!)
        : expandPinnBox(listHeight!)} .3s ; */
    `}
`;
