import React, { useState } from "react";
import styled from "styled-components";
import useStore from "../../../store/useStore";

import { IconBox } from "../../../components/IconBox";
import Text from "../../../components/Text";

import { ITag } from "../../../utils/interface/interface";
import { setTalkTag } from "../../talk_page/utils/talk_service";

interface IMemoName {
  tag: ITag;
  isOpenMenu?: boolean;
  onClickTagName?: () => void;
}

const MemoName = ( { tag, isOpenMenu, onClickTagName }: IMemoName ) => {

  const { palette } = useStore();
  const [memoName, setMemoName] = useState(setTalkTag(tag, "expand"))

  React.useEffect(() => {
    console.log("태그이름바뀜")
    setMemoName(setTalkTag(tag, "expand"))
  }, [tag])
  

  console.log("태그명 변화 확인", tag)

  return(
    <TalkTagExpand
      shadow
      height={2.75}
      fontSize="l"
      bgColor={palette.getColor(tag)}
      onClick={onClickTagName}
    >
      {memoName}
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