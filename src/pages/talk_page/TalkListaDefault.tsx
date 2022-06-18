import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Text from "../../components/Text";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { faClockFour } from "@fortawesome/free-regular-svg-icons";
import { IconBox } from "../../components/IconBox";
import { IMemo, ITag } from "../../utils/interface/interface";
import { Time } from "../../utils/service/time";

import useStore from "../../store/useStore";
import { TalkProps } from "./TalkPage";
import { getTagWithMemo } from "./utils/talk_service";
import { setTextLine } from "../../styles/stylesCss";
import { RowBox } from "../../components/FlexBox";
import { TalkContent, TalkListBox } from "./TalkList";

interface ITalkListaDefault {
  onClickMenuBtn: (memo: IMemo) => void;
  memo: IMemo;
  tag: ITag;
  talkTagName: JSX.Element | string;
}

const TalkListaDefault = ( {tag, memo, onClickMenuBtn, talkTagName }: ITalkListaDefault ) => {

  const { palette } = useStore();
  const time = new Time();
  console.log(tag, memo)
  

  return(
      <TalkListBox>
        <IconBox 
          bgColor={palette.getColor(tag)}
          shadow 
          width={1.75} 
          height={1.75}
        >
          {talkTagName}
        </IconBox>
          <TalkContent
            shadow
            lineClamp={4}
            padding=".25rem .5rem"
            bgColor="white"
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

export default TalkListaDefault;
