import React, { forwardRef, memo } from "react";
import useStore from "../../../store/useStore";

import Text from "../../../components/Text";
import { IconBox } from "../../../components/IconBox";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import { IMemo, ITag } from "../../../utils/interface/interface";
import { Time } from "../../../utils/service/time";
import { TalkContent } from "../utils/TalkComponents";
import { setTalkTag } from "../utils/talk_service";

import { TalkListBox } from "./TalkListContainer";


interface ITalkListaDefault {
  tag: ITag;
  memo: IMemo;
  onClickMenuBtn: (memo: IMemo) => void;
}


const TalkListaDefault = ( {
  tag, 
  memo, 
  onClickMenuBtn 
}: ITalkListaDefault  ) => {

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
            fontSize="xs"
          >
            {time.toTalk(memo.createTime)}
          </Text>
          <IconBox
            onClick={() => onClickMenuBtn(memo)}
            shadow 
            width={1.75} 
            height={1.75}
          >
            <Icon size="lg" color="#505050" 
              icon={faEllipsis}
            />
          </IconBox>
        </TalkListBox>
  )
}

export default memo(TalkListaDefault);
