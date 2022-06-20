import React from "react";
import styled from "styled-components";
import Header from "../../../components/Header";
import Text from "../../../components/Text";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { faClockFour } from "@fortawesome/free-regular-svg-icons";
import { IconBox } from "../../../components/IconBox";
import { IMemo, ITag } from "../../../utils/interface/interface";
import { Time } from "../../../utils/service/time";

import useStore from "../../../store/useStore";
import { TalkProps } from "../TalkPage";
import { getTagWithMemo, setTalkTag } from "../utils/talk_service";
import { setTextLine } from "../../../styles/stylesCss";
import { ColBox, RowBox } from "../../../components/FlexBox";
import { TalkListBox } from "./TalkList";
import { TalkContent } from "../utils/TalkComponents";

interface ITalkListExpand {
  onClickMenuBtn: (memo: IMemo) => void;
  memo: IMemo;
  tag: ITag;
}

const TalkListExpand = ( { tag, memo, onClickMenuBtn }: ITalkListExpand ) => {

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
      <TalkListBox expand>
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
          size="xs"
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

export default TalkListExpand;

const IconBoxExpand = styled(IconBox)`
  justify-content: flex-start;
  width: fit-content;
  height: 1.75rem;
  padding: 0 .5rem;
`
