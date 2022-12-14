import React, { memo } from "react";
import styled from "styled-components";
import useStore from "../../../store/useStore";
import Linkify from "react-linkify";

import Text from "../../../components/Text";
import { IconBox } from "../../../components/IconBox";
import { ColBox } from "../../../components/FlexBox";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import { IMemo, ITag } from "../../../utils/interface/interface";
import { Time } from "../../../utils/service/time";
import { setTalkTag } from "../utils/talk_service";
import { overFlowHidden, stretchX } from "../../../styles/stylesCss";

import { TalkListBox } from "./TalkListContainer";
import { TalkContent } from "../utils/TalkComponents";

interface ITalkListExpand {
  memo: IMemo;
  tag: ITag;
  onClickMenuBtn: (memo: IMemo) => void;
}

const TalkListExpand = ({ tag, memo, onClickMenuBtn }: ITalkListExpand) => {
  const { palette } = useStore();
  const time = new Time();

  return (
    <ColBox padding="0" gap={0.25}>
      <IconBoxExpand bgColor={palette.getColor(tag)} shadow>
        {setTalkTag(tag, "expand")}
      </IconBoxExpand>

      <TalkListBox expand>
        <TalkContent shadow lineClamp={20}>
          <Linkify>{memo.content}</Linkify>
        </TalkContent>
        <Text bold center padding="0" fontSize="xs">
          {time.toTalk(memo.createTime)}
        </Text>
        <IconBox
          shadow
          width={1.75}
          height={1.75}
          onClick={() => onClickMenuBtn(memo)}
        >
          <Icon size="lg" color="#505050" icon={faEllipsis} />
        </IconBox>
      </TalkListBox>
    </ColBox>
  );
};

export default memo(TalkListExpand);

const IconBoxExpand = styled(IconBox)`
  justify-content: flex-start;
  width: fit-content;
  max-width: 70%;
  height: 1.75rem;
  padding: 0 0.5rem;
  ${overFlowHidden};

  /* animation: ${stretchX} .2s ease-in-out; */
`;
