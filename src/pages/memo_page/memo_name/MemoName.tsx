import React from "react";
import styled from "styled-components";
import { IconBox } from "../../../components/IconBox";

import Text from "../../../components/Text";
import useStore from "../../../store/useStore";
import { ITag } from "../../../utils/interface/interface";
import { setTalkTag } from "../../talk_page/utils/talk_service";

interface IMemoName {
  tag: ITag;
  isOpenMenu?: boolean;
  onClickTagName?: () => void;
}

const MemoName = ( { tag, isOpenMenu, onClickTagName }: IMemoName ) => {

  const { palette } = useStore();

  return(
    <TalkTagExpand
      shadow
      height={2.25}
      size="l"
      bgColor={palette.getColor(tag)}
      onClick={onClickTagName}
    >
      {setTalkTag(tag, "expand")}
    </TalkTagExpand>
  )
}

export default MemoName;

const TalkTagExpand = styled(IconBox)`
  justify-content: flex-start;
  width: 100%;
  padding: .5rem .75rem;
  border-radius: .25rem;
`