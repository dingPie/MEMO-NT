import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useStore from "../../store/useStore";

import Text from "../../components/Text";
import { ColBox } from "../../components/FlexBox";

import { FbMemo } from "../../firebase/firestore_memo_service";
import { FbTag } from "../../firebase/firestore_tag_service";

import { setTextLine } from "../../styles/stylesCss";
import { IMemo, ITag } from "../../utils/interface/interface";
import { setTalkTag } from "../talk_page/utils/talk_service";


interface IGridMemo {
  fbMemo: FbMemo;
  fbTag: FbTag;
  tag: ITag;
  onClickMemo: () => void;
}


const GridMemo = ( {fbMemo, fbTag, tag, onClickMemo }: IGridMemo ) => {

  const { palette } = useStore();
  const [usedMemo, setUsedMemo] = useState<IMemo[]>([]);

  useEffect(() => {
    if (!tag) return
    getUsedMemo(tag)
  }, [tag])

  const getUsedMemo = async (tag: ITag) => {
    // const promiseResult = await fbMemo.getUsedMemo(tag.usedMemo);
    const promiseResult = await fbMemo.getMemoWithTag(tag, "gridPage");
    const result = await Promise.all(promiseResult);
    setUsedMemo(result)
  }
  

  return(
    <ColBox shadow 
      gap={.25} 
      padding=".5rem" 
      radius={.25}
      onClick={onClickMemo}
      bgColor={"white"}
    >
      <TalkTagExpand
        bold
        shadow
        height={2}
        bgColor={palette.getColor(tag)} // 테스트 컬러
      >
        {setTalkTag(tag, "expand")}
      </TalkTagExpand>
      
      <ColBox gap={.25} padding="0" >
        <GridText>
          {usedMemo[0] ? usedMemo[0].content : " "}
        </GridText>
        <GridText>
          {usedMemo[1] ? usedMemo[1].content : " "}
        </GridText>
        <GridText>
          {usedMemo[2] ? usedMemo[2].content : " "}
        </GridText>
      </ColBox>
    </ColBox>
  )
}
export default GridMemo;

const GridText = styled(Text)`
  padding: .125rem .25rem;
  border-radius: 0;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
  line-height: 1.375rem ;

  ${setTextLine}
`
const TalkTagExpand = styled(Text)`
  justify-content: flex-start;
  width: 100%;
  padding: 0 .5rem;
  border-radius: .25rem;

  ${setTextLine};
`
