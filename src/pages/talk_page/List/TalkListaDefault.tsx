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

//   const test = async () => {
//     const result = await axios.get(link[0].href, {
//       // headers: {
//       //   "Access-Control-Allow-Origin": `*`,
//       //   "Access-Control-Allow-Credentials": "true",
//       // },
// ``    });
//   };
//   console.log(link.length && test());

  // 결론적으로 문제를 해결하려면 server에서 포워딩 해 주는 수밖에 없다는건가.
  // 그럼 해결이 가능해도, 굳이 좋은 해결방법은 아닌 것 같다.
  // 링크 축약의 방법이나 내 메타정보 및 og 데이터 넣는거나 생각하자...
  // 시발...

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
