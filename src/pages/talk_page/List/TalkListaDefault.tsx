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

import * as linkify from "linkifyjs";
import Linkify from "linkify-react";
import axios from "axios";
interface ITalkListaDefault {
  tag: ITag;
  memo: IMemo;
  onClickMenuBtn: (memo: IMemo) => void;
}

const TalkListaDefault = ({ tag, memo, onClickMenuBtn }: ITalkListaDefault) => {
  const { palette } = useStore();
  const time = new Time();
  const link = linkify.find(memo.content);
  const options = { defaultProtocol: "https" };

  // const test = async () => {
  //   const url = link[0].href;
  //   const opt = {
  //     headers: {
  //       "Access-Control-Allow-Origin": `http://localhost:3000`,
  //       "Access-Control-Allow-Credentials": "true",
  //     },
  //     credentials: "omit",
  //   };
  //   const result = await axios.get(url, opt);
  // };
  // console.log(link.length > 0 && test());

  return (
    <TalkListBox>
      <IconBox
        shadow
        bgColor={palette.getColor(tag)}
        width={1.75}
        height={1.75}
      >
        {setTalkTag(tag)}
      </IconBox>
      <TalkContent shadow lineClamp={6}>
        {link.length ? (
          <>
            <Linkify options={options}>{memo.content}</Linkify>
          </>
        ) : (
          memo.content
        )}
      </TalkContent>

      <Text bold center padding="0" fontSize="xs">
        {time.toTalk(memo.createTime)}
      </Text>
      <IconBox
        onClick={() => onClickMenuBtn(memo)}
        shadow
        width={1.75}
        height={1.75}
      >
        <Icon size="lg" color="#505050" icon={faEllipsis} />
      </IconBox>
    </TalkListBox>
  );
};

export default memo(TalkListaDefault);
