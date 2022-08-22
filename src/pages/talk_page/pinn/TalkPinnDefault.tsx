import React, { forwardRef } from "react";
import styled, { css } from "styled-components";
import useStore from "../../../store/useStore";

import { RowBox } from "../../../components/FlexBox";
import { IconBox } from "../../../components/IconBox";

import { setTextLine } from "../../../styles/stylesCss";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { IMemo, ITag } from "../../../utils/interface/interface";
import { setTalkTag } from "../utils/talk_service";
import { TalkContent } from "../utils/TalkComponents";

import { PinnBox, PinnBtns } from "./TalkPinnContainer";

interface ITalkPinnDefault {
  tag: ITag;
  memo: IMemo;
  isExpand: boolean;
  onClickDeletePinn: () => void;
  onClickExpandPinn: () => void;
}

const TalkPinnDefault = forwardRef<HTMLDivElement, ITalkPinnDefault>(
  ({ tag, memo, isExpand, onClickDeletePinn, onClickExpandPinn }, ref) => {
    const { palette } = useStore();

    return (
      <PinnBox isExpand={isExpand} ref={ref}>
        <IconBox
          bgColor={palette.getColor(tag)} // 테스트 컬러
          width={1.875}
          height={1.875}
        >
          {setTalkTag(tag)}
        </IconBox>

        <TalkContent shadow lineHieght={1.5} lineClamp={1}>
          {memo.content}
        </TalkContent>

        <PinnBtns width={4}>
          <IconBox height={1.75} onClick={onClickDeletePinn}>
            <Icon size="lg" icon={faTrashCan} />
          </IconBox>
          <IconBox height={1.75} onClick={onClickExpandPinn}>
            <Icon size="lg" icon={faChevronDown} />
          </IconBox>
        </PinnBtns>
      </PinnBox>
    );
  }
);
export default TalkPinnDefault;
