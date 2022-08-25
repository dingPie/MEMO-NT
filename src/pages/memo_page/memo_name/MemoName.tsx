import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useStore from "../../../store/useStore";

import { IconBox } from "../../../components/IconBox";
import Text from "../../../components/Text";

import { ITag } from "../../../utils/interface/interface";
import { setTalkTag } from "../../talk_page/utils/talk_service";

interface IMemoName {
  tag: ITag;
  onClickTagName?: () => void;
}

const MemoName = ({ tag, onClickTagName }: IMemoName) => {
  const { palette } = useStore();
  const [memoName, setMemoName] = useState(setTalkTag(tag, "expand"));

  useEffect(() => {
    setMemoName(setTalkTag(tag, "expand"));
  }, [tag]);

  return (
    <TalkTagExpand
      shadow
      height={2.75}
      fontSize="l"
      bgColor={palette.getColor(tag)}
      onClick={onClickTagName}
    >
      {memoName}
    </TalkTagExpand>
  );
};

export default MemoName;

const TalkTagExpand = styled(IconBox)`
  justify-content: flex-start;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
`;
