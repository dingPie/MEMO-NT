import React from "react";
import styled from "styled-components";
import Text from "../../components/Text";
import { RowBox } from "../../components/FlexBox";
import { IconBox } from "../../components/IconBox";
import { InputText } from "../../components/InputText";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { ITag } from "../../utils/interface/interface";

interface IEditMemoTag {
  tag: ITag;
  onClickDoEditTag?: () => void;
}

const EditMemoTag = ( { tag, onClickDoEditTag }: IEditMemoTag ) => {

  return (
    <EditTagBox
      shadow
      bgColor={tag.color}
      // height={2.25}
    >
      <Text bold padding="0" size='l' width={1}>
       #
      </Text>
      <InputText 
        noResize
        defaultValue={tag.name}
        bgColor={tag.color}
        bold
        height={1.25}
      />

      <IconBox
        height={1.25}
        bgColor={tag.color}
        onClick={onClickDoEditTag}
      >
        <Icon icon={faCheck} />
      </IconBox>
    </EditTagBox>
  )
}

export default EditMemoTag;

const EditTagBox = styled(RowBox)`
  position: absolute;
  width: 96%;
  padding: .5rem .75rem;
  border-radius: .25rem;
  gap: .1rem;
`