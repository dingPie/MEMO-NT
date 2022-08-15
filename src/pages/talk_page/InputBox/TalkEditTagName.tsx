import React, { memo } from "react";
import styled from "styled-components";
import useStore from "../../../store/useStore";

import Text from "../../../components/Text"
import { ColBox, RowBox } from "../../../components/FlexBox";
import { IconBox } from "../../../components/IconBox";
import { ScrollBox } from "../../../components/ScrollBox";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faHashtag, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faClockFour } from "@fortawesome/free-regular-svg-icons";

import { IMemo, ITag } from "../../../utils/interface/interface";
import TagOptions from "./TagOptions";


interface ITalkEditTagName {
  tags: ITag[];
  editMemo: IMemo;
  editTagName: string;
  onChangeTagName: (e?: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | null, tagName?: string) => void;
  onClickCancelEditMemo: () => void;
}


const TalkEditTagName = ( { 
  tags, 
  editMemo, 
  editTagName, 
  onChangeTagName,
  onClickCancelEditMemo, 
}: ITalkEditTagName ) => {

  const { palette } = useStore();
  const tag = tags.filter(v => v.id === editMemo.tagId)[0]
  const recentTags = tags.filter( v => v.id !== "undefined" && v.id !== "toBeDeleted" )

  return(
    <ColBox 
      padding="0" 
      gap={.1} 
      bgColor={"white"}
    >
      <RowBox padding="0 .5rem">
        <ScrollBox>
          { recentTags.map( tag =>
            <TagOptions
              key={tag.id}
              onClick={ () => onChangeTagName(null, tag.name )}
              tagColor={palette.getColor(tag)} 
              tagName={tag.name} 
            />
          )}
        </ScrollBox>
      </RowBox>
      <MenuBox 
        between gap={.1} 
      >
        <RowBox 
          gap={.25} 
          radius={1}
          padding=".25rem .5rem"
          bgColor={tag.id === "toBeDeleted" ? "white" : palette.getColor(tag)}
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
            placeholder="태그 없음"
            bgColor={tag.id === "toBeDeleted" ? "white" : palette.getColor(tag)}
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
    </ColBox>
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