import React, { useEffect } from "react";
import styled from "styled-components";
import { RowBox } from "../../../components/FlexBox";
import TagOptions from "./TagOptions";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faHashtag, faXmark } from "@fortawesome/free-solid-svg-icons";

import { CustomBtn } from "../../../components/Buttons";
import { dummyTags } from "../../../utils/data/dummyData";
import { IMemo } from "../../../utils/interface/interface";
import { InputText } from "../../../components/InputText";
import Text from "../../../components/Text"
import { IconBox } from "../../../components/IconBox";
import TagService from "../../../utils/data/tag_service";
import { TalkProps } from "../TalkPage";
import useStore from "../../../store/useStore";

interface ITalkEditInput extends TalkProps {
  editMemo: IMemo;
  bottomSpace: number;
  onClickCancelEditMemo: () => void;
  editTagName: string;
  onChangeTagName: (e?: React.ChangeEvent<HTMLTextAreaElement> | null, tagName?: string) => void;
}

const TalkEditInput = ( { 
  tags, 
  editMemo, 
  bottomSpace, 
  onClickCancelEditMemo, 
  editTagName, 
  onChangeTagName
}: ITalkEditInput ) => {


  const { palette } = useStore();
  const tag = tags.filter(v => v.id === editMemo.tagId)[0]
  console.log(editMemo, tag)

  useEffect(() => {
    onChangeTagName( null, tag.name)
  }, [])
  

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
      bgColor={palette.getColor(tag)}
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
        bold
        noResize
        // defaultValue={tag.name}
        height={1.25}
        bgColor={palette.getColor(tag)}
        value={editTagName}
        onChange={onChangeTagName}
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

export default TalkEditInput;

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