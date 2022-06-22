import React from "react";
import styled from "styled-components";
import Text from "../../../components/Text";
import { RowBox } from "../../../components/FlexBox";
import { IconBox } from "../../../components/IconBox";
import { InputText } from "../../../components/InputText";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { ITag } from "../../../utils/interface/interface";
import useStore from "../../../store/useStore";

interface IEditMemoName {
  tag: ITag;
  onClickDoEditTag?: () => void;
}

const EditMemoName = ( { tag, onClickDoEditTag }: IEditMemoName ) => {

  const { palette } = useStore();


  return (
    <EditTagBox
      shadow
      bgColor={tag.color}
      // height={2.25}
    >
      {/* <Text bold padding="0" size='l' width={1}>
       #
      </Text> */}
      <InputText
        bold
        noResize
        defaultValue={tag.name}
        bgColor={palette.getColor(tag)}
        height={1.25}
        padding="0"
        size="l"
      />

      <IconBox
        height={1.25}
        size="l"
        bgColor={palette.getColor(tag)}
        onClick={onClickDoEditTag}
      >
        <Icon icon={faCheck} />
      </IconBox>
    </EditTagBox>
  )
}

export default EditMemoName;

const EditTagBox = styled(RowBox)`
  position: absolute;
  width: 96%;
  padding: .5rem .75rem;
  border-radius: .25rem;
  gap: .1rem;
`