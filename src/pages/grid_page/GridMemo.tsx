import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useStore from "../../store/useStore";

import Text from "../../components/Text";
import { ColBox } from "../../components/FlexBox";

import { FbMemo } from "../../firebase/firestore_memo_service";
import { FbTag } from "../../firebase/firestore_tag_service";

import { setTextLine, stretchY } from "../../styles/stylesCss";
import { IMemo, ITag } from "../../utils/interface/interface";
import { setTalkTag } from "../talk_page/utils/talk_service";

interface IGridMemo {
  fbTag: FbTag;
  fbMemo: FbMemo;
  tag: ITag;
  onClickMemo: () => void;
}

const GridMemo = ({ fbTag, fbMemo, tag, onClickMemo }: IGridMemo) => {
  const { palette } = useStore();
  const [usedMemo, setUsedMemo] = useState<IMemo[]>([]);

  useEffect(() => {
    if (!tag) return;
    getUsedMemo(tag);
  }, [tag]);

  const getUsedMemo = async (tag: ITag) => {
    // const promiseResult = await fbMemo.getUsedMemo(tag.usedMemo);
    const promiseResult = await fbMemo.getMemoWithTag(tag, "gridPage");
    const result = await Promise.all(promiseResult);
    setUsedMemo(result);
  };

  return (
    <ColBox
      shadow
      gap={0.25}
      padding=".5rem"
      radius={0.25}
      onClick={onClickMemo}
      bgColor={"white"}
    >
      <TalkTagExpand bold shadow height={2} bgColor={palette.getColor(tag)}>
        {setTalkTag(tag, "expand")}
      </TalkTagExpand>

      <ColBox gap={0.25} padding="0">
        <GridText>{usedMemo[0] ? usedMemo[0].content : " "}</GridText>
        <GridText>{usedMemo[1] ? usedMemo[1].content : " "}</GridText>
        <GridText>{usedMemo[2] ? usedMemo[2].content : " "}</GridText>
      </ColBox>
    </ColBox>
  );
};

export default GridMemo;

const GridText = styled(Text)`
  padding: 0.125rem 0.25rem;
  border-radius: 0;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  line-height: 1.375rem;

<<<<<<< HEAD
  max-width: 22vh; //  예기치못한 에러로 임시 지정값
  ${setTextLine};
`
=======
  max-width: 21.5vh;
  ${setTextLine}
`;
>>>>>>> 7fc89ad50635e0d74a9f2664ca0b0edb0d1104e8

const TalkTagExpand = styled(Text)`
  padding: 0 0.5rem;
  border-radius: 0.25rem;

  ${setTextLine};
`;
