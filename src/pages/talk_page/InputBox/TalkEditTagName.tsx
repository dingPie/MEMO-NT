import React, { memo } from "react";
import styled from "styled-components";
import useStore from "../../../store/useStore";

import Text from "../../../components/Text"
import { RowBox } from "../../../components/FlexBox";
import { IconBox } from "../../../components/IconBox";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faHashtag, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faClockFour } from "@fortawesome/free-regular-svg-icons";

import { IMemo, ITag } from "../../../utils/interface/interface";


interface ITalkEditTagName {
  tags: ITag[];
  editMemo: IMemo;
  onClickCancelEditMemo: () => void;
  editTagName: string;
  onChangeTagName: (e?: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | null, tagName?: string) => void;
}


const TalkEditTagName = ( { 
  tags, 
  editMemo, 
  onClickCancelEditMemo, 
  editTagName, 
  onChangeTagName
}: ITalkEditTagName ) => {

  const { palette } = useStore();
  const tag = tags.filter(v => v.id === editMemo.tagId)[0]


  return(
    <MenuBox 
      between gap={.1} 
    >
    <RowBox 
      gap={.25} 
      radius={1}
      padding=".25rem .5rem"
      bgColor={palette.getColor(tag)}
     >
      <Text 
        bold 
        padding="0" 
        fontSize='l' 
        width={1}
      >
       #
      </Text>
      <TagInput 
        bgColor={palette.getColor(tag)}
        value={editTagName}
        onChange={(e) => onChangeTagName(e)}
      />
    </RowBox>

    <RowBox gap={.25} padding="0" right>
      <IconBox bgColor="#505050"
        onClick={ () => onChangeTagName(null, "toBeDeleted")}
      >
        <Icon icon={faClockFour} color="#FFFFFF" />
      </IconBox>
      <IconBox bgColor="#f5f5f5"
        onClick={ () => onChangeTagName(null, "")}
      >
        <Icon icon={faHashtag} />
      </IconBox>
      <IconBox
        onClick={onClickCancelEditMemo}
      >
        <Icon icon={faXmark} />
      </IconBox>
    </RowBox>

    </MenuBox>
  )
}

export default memo(TalkEditTagName);

// 여기 이제 input 옵션창 해야함..

const MenuBox = styled(RowBox)`
  display: flex;
  align-items: center;
  
  padding: .5rem .5rem;
  max-width: 30rem;
  background: white;
`

const TagInput = styled.input<{bgColor?: string}>`
  font-weight: bold;
  background: ${({bgColor}) => bgColor && bgColor };
  height: 1.25rem;

  border: none;
  outline: none;
  resize: none;
`