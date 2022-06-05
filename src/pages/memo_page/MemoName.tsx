import React from "react";

import Text from "../../components/Text";
import { ITag } from "../../utils/interface/interface";

interface IMemoName {
  tag: ITag;
  onClickMemo?: () => void;
}

const MemoName = ( { tag }: IMemoName ) => {


  return(
    <Text
      bold
      shadow
      radius={.25}
      padding=".5rem .75rem"
      size="l"
      bgColor={tag.color}
    >
      # {tag.name}
    </Text>

  )
}

export default MemoName;