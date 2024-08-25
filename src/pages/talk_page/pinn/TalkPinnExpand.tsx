import React, { forwardRef, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import useStore from "../../../store/useStore";

import { RowBox } from "../../../components/FlexBox";
import { IconBox } from "../../../components/IconBox";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faTrashCan,
  faAlignLeft,
} from "@fortawesome/free-solid-svg-icons";
import { shrinkX, stretchX } from "../../../styles/stylesCss";

import { IMemo, ITag } from "../../../utils/interface/interface";
import { setTalkTag } from "../utils/talk_service";
import { TalkContent } from "../utils/TalkComponents";
import { PinnBox, PinnBtns } from "./TalkPinnContainer";

interface ITalkPinnExpand {
  tag: ITag;
  memo: IMemo;
  isExpand: boolean;
  pinnHeight: number;
  onClickDeletePinn: () => void;
  onClickReducePinn: () => void;
  onClicGoMemoBtn: () => void;
}

const TalkPinnExpand = forwardRef<HTMLDivElement, ITalkPinnExpand>(
  (
    {
      tag,
      memo,
      isExpand,
      pinnHeight,
      onClickDeletePinn,
      onClickReducePinn,
      onClicGoMemoBtn,
    },
    ref,
  ) => {
    const { palette } = useStore();

    return (
      <PinnBox ref={ref} expand isExpand={isExpand} pinnHeight={pinnHeight}>
        <RowBox padding="0" gap={0.5} justifyBetween>
          <TalkTagExpand
            height={2}
            bgColor={palette.getColor(tag)} // 테스트 컬러
            isExpand={isExpand}
          >
            {setTalkTag(tag, "expand")}
          </TalkTagExpand>
          <PinnBtns width={6}>
            <IconBox height={2} onClick={onClicGoMemoBtn}>
              <Icon size="lg" icon={faAlignLeft} />
            </IconBox>
            <IconBox height={2} onClick={onClickDeletePinn}>
              <Icon size="lg" icon={faTrashCan} />
            </IconBox>
            <IconBox height={2} onClick={onClickReducePinn}>
              <Icon size="lg" icon={faChevronUp} />
            </IconBox>
          </PinnBtns>
        </RowBox>

        <TalkContent shadow lineClamp={10}>
          {memo.content}
        </TalkContent>
      </PinnBox>
    );
  },
);
export default TalkPinnExpand;

const TalkTagExpand = styled(IconBox)<{ isExpand: boolean }>`
  justify-content: flex-start;
  width: 100%;
  padding: 0 0.5rem;
  border-radius: 0.25rem;
`;
/* animation:  ${ ({isExpand}) => isExpand ? expandPinnTag : reducePinnTag} .3s ease-in-out; */

export const expandPinnTag = keyframes`
  from {
    width: 30px;
  }
  to {
    width: 360px;
  }
`;

export const reducePinnTag = keyframes`
  from {
    width: 360px;
  }
  to {
    width: 30px;
  }
`;
