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
  inputMemoName?: string;
  onChangeMemoName: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClickDoEditTag: (tag: ITag) => void;
}

const EditMemoName = ( { tag, onClickDoEditTag, inputMemoName, onChangeMemoName }: IEditMemoName ) => {

  const { palette } = useStore();


  return (
    <EditTagBox
      shadow
      bgColor={palette.getColor(tag)}
    >
      <InputText
        bold
        noResize
        size="l"
        height={1.25}
        padding="0"
        lineHeight={1.875}
        bgColor={palette.getColor(tag)}
        value={inputMemoName}
        onChange={onChangeMemoName}
      />

      <IconBox
        size="l"
        bgColor={palette.getColor(tag)}
        onClick={() => onClickDoEditTag(tag)}
      >
        <Icon icon={faCheck} />
      </IconBox>
    </EditTagBox>
  )
}

export default EditMemoName;

const EditTagBox = styled(RowBox)`
  width: 100%;
  padding: .5rem .75rem;
  border-radius: .25rem;
`