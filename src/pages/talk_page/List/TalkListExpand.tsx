import React, { forwardRef, memo, useMemo } from "react";
import styled from "styled-components";
import useStore from "../../../store/useStore";

import Header from "../../../components/Header";
import Text from "../../../components/Text";
import { IconBox } from "../../../components/IconBox";
import { ColBox, RowBox } from "../../../components/FlexBox";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { faClockFour } from "@fortawesome/free-regular-svg-icons";

import { IMemo, ITag } from "../../../utils/interface/interface";
import { Time } from "../../../utils/service/time";
import { getTagWithMemo, setTalkTag } from "../utils/talk_service";
import { overFlowHidden, setTextLine, stretchX } from "../../../styles/stylesCss";

import { TalkListBox } from "./TalkListContainer";
import { TalkContent } from "../utils/TalkComponents";

interface ITalkListExpand {
  onClickMenuBtn: (memo: IMemo) => void;
  memo: IMemo;
  tag: ITag;
}

const TalkListExpand = ( { tag, memo, onClickMenuBtn }: ITalkListExpand  ) => {

  const { palette } = useStore();
  const time = new Time();


  return(
    <ColBox
      padding="0"
      gap={.25}
    >
      <IconBoxExpand 
        bgColor={palette.getColor(tag)}
        shadow
      >
        {setTalkTag(tag, "expand")}
      </IconBoxExpand>

      <TalkListBox 
        expand
      >
        <TalkContent
          shadow
          lineClamp={20}
        >
          {memo.content}
        </TalkContent>
        <Text
          bold
          center
          padding="0"
          fontSize="xs"
        >
          {time.toTalk(memo.createTime)}
        </Text>
        <IconBox 
          shadow width={1.75} height={1.75}
          onClick={() => onClickMenuBtn(memo)}
        >
          <Icon size="lg" color="#505050" 
            icon={faEllipsis}
          />
        </IconBox>
      </TalkListBox>
    </ColBox>
  )
}

export default memo(TalkListExpand);

const IconBoxExpand = styled(IconBox)`
  justify-content: flex-start;
  width: fit-content;
  max-width: 70%;
  height: 1.75rem;
  padding: 0 .5rem;
  ${overFlowHidden};

  /* animation: ${stretchX} .2s ease-in-out; */
`
