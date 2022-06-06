import React from "react";
import styled from "styled-components";
import { RowBox } from "../../components/FlexBox";
import TagOptions from "./TagOptions";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faHashtag, faXmark } from "@fortawesome/free-solid-svg-icons";

import { CustomBtn } from "../../components/Buttons";
import { dummyTags } from "../../utils/data/dummyData";
import { IMemo } from "../../utils/interface/interface";
import { InputText } from "../../components/InputText";
import Text from "../../components/Text"
import Tag from "../../utils/data/tag";
import { IconBox } from "../../components/IconBox";

interface ITalkInputOption {
  editMemo: IMemo;
  bottomSpace: number;
  onClickCancelEditMemo: () => void;
}

const TalkInputOption = ( { editMemo, bottomSpace, onClickCancelEditMemo }: ITalkInputOption ) => {

  const tag = new Tag();
  const targetTag = tag.findTag(editMemo)

  return(
    <MenuBox 
      between gap={.1} 
      bottomSpace={bottomSpace}
    >
    <RowBox 
      right
      gap={.25} 
      radius={1}
      padding=".25rem .5rem"
      bgColor={targetTag.color}
     >
      <Text 
        bold 
        padding="0" 
        size='l' 
        width={1}
      >
       #
      </Text>
      <InputText 
        noResize
        bgColor={targetTag.color}
        defaultValue={tag.tagName(targetTag)}
        bold
        height={1.25}
      />
    </RowBox>

    <RowBox gap={.25} padding="0" right>
      <TagOptions 
        tagColor="#F5F5F5"
        tagName="#"  
      />
      <IconBox
        onClick={onClickCancelEditMemo}
      >
        <Icon icon={faXmark} />
      </IconBox>

    </RowBox>

    </MenuBox>
  )
}

export default TalkInputOption;

// 여기 이제 input 옵션창 해야함..

const MenuBox = styled(RowBox)<{bottomSpace?: number}>`
  display: flex;
  position: fixed;
  align-items: center;
  bottom: ${({bottomSpace}) => bottomSpace ? (bottomSpace-4)+"px": "4rem" } ; // input Box 크기
  left: 50%;
  transform: translate(-50%, 0);
  
  
  padding: .5rem .5rem;
  max-width: 30rem;
  background: white;
`