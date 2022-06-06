import React from "react";
import styled from "styled-components";

import Text from "../../components/Text";
import { ColBox } from "../../components/FlexBox";
import { oneLineText } from "../../styles/stylesCss";
import { ITag } from "../../utils/interface/interface";
import { dummyMemos } from '../../utils/data/dummyData'

interface IGridMemo {
  tag: ITag;
  onClickMemo: () => void;
}

const GridMemo = ( { tag, onClickMemo }: IGridMemo ) => {

  return(
    <ColBox shadow 
      gap={.25} 
      padding=".5rem" 
      radius={.25}
      onClick={onClickMemo}
      bgColor={"white"}
    >
      <Text
        bold
        shadow
        radius={.25}
        padding=".375rem .5rem"
        bgColor={tag.color}
      >
       # {tag.name}
      </Text>

      <ColBox gap={.25} padding="0" >
        <GridText>
          { tag.memo[0] ? dummyMemos.filter(v => v.id ===tag.memo[0] )[0].content  : " "}
        </GridText>
        <GridText>
          { tag.memo[1] ? dummyMemos.filter(v => v.id ===tag.memo[1] )[0].content : " "}
        </GridText>
        <GridText>
          { tag.memo[2] ? dummyMemos.filter(v => v.id ===tag.memo[2] )[0].content : " "}
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

  ${oneLineText}
`