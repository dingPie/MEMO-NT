import React, { forwardRef, memo } from "react";
import styled from "styled-components";
import useStore from "../../../store/useStore";

import Header from "../../../components/Header";
import Text from "../../../components/Text";
import { RowBox } from "../../../components/FlexBox";
import { IconBox } from "../../../components/IconBox";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { faClockFour } from "@fortawesome/free-regular-svg-icons";

import { IMemo, ITag } from "../../../utils/interface/interface";
import { Time } from "../../../utils/service/time";
import { TalkContent } from "../utils/TalkComponents";
import { getTagWithMemo, setTalkTag } from "../utils/talk_service";
import { setTextLine } from "../../../styles/stylesCss";

import { TalkListBox } from "./TalkList";
import { TalkProps } from "../TalkPage";

interface ITalkListaDefault {
  tag: ITag;
  memo: IMemo;
  onClickMenuBtn: (memo: IMemo) => void;
}

const TalkListaDefault = ( {tag, memo, onClickMenuBtn }: ITalkListaDefault  ) => {

  const { palette } = useStore();
  const time = new Time();
  

  return(
      <TalkListBox>
        <IconBox 
          bgColor={palette.getColor(tag)}
          shadow 
          width={1.75} 
          height={1.75}
        >
          {setTalkTag(tag)}
        </IconBox>
          <TalkContent
            shadow
            lineClamp={4}
          >
            {memo.content}
          </TalkContent>
          <Text
            bold
            center
            padding="0"
            size="xs"
          >
            {time.toTalk(memo.createTime)}
          </Text>
          <IconBox 
            onClick={() => onClickMenuBtn(memo)}
            shadow 
            width={1.75} 
            height={1.75}
            fontSize={.875}
          >
            <Icon size="lg" color="#505050" 
              icon={faEllipsis}
            />
          </IconBox>
        </TalkListBox>
  )
}

export default memo(TalkListaDefault);
