import React, { forwardRef, memo } from "react";
import useStore from "../../../store/useStore";
// import Linkify from "react-linkify";

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

interface ITalkListaDefault {
  tag: ITag;
  memo: IMemo;
  onClickMenuBtn: (memo: IMemo) => void;
}

const TalkListaDefault = ({ tag, memo, onClickMenuBtn }: ITalkListaDefault) => {
  const { palette } = useStore();
  const time = new Time();
  const link = linkify.find(memo.content);

  // const test = async () => {
  //   // const res = await fetch(link[0].value, { method: "GET", mode: "no-cors" });
  //   // const tt = res.body.querySelector('meta[name="description"]').content;
  //   axios.defaults.withCredentials = true;
  //   const result = await axios.get(link[0].value, {
  //     headers: {
  //       "Access-Control-Allow-Origin": `*`,
  //       "Access-Control-Allow-Credentials": "true",
  //     },
  //   });
  //   console.log(
  //     result.data
  //       .split("<meta ")
  //       .filter((data: string) => data.includes("og:title"))
  //   );
  // };
  // console.log(link.length && test());

  //커밋 테스트
  console.log("커밋테스트");

  const options = { defaultProtocol: "https" };
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
