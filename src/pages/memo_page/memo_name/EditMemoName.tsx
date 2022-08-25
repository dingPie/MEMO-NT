import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useStore from "../../../store/useStore";

import Text from "../../../components/Text";
import { RowBox } from "../../../components/FlexBox";
import { IconBox } from "../../../components/IconBox";
import InputText from "../../../components/InputText";

import { ITag } from "../../../utils/interface/interface";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

interface IEditMemoName {
  tag: ITag;
  inputMemoName?: string;
  onChangeMemoName: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClickDoEditTag: (tag: ITag) => void;
}

const EditMemoName = ({
  tag,
  inputMemoName,
  onClickDoEditTag,
  onChangeMemoName,
}: IEditMemoName) => {
  const { palette } = useStore();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <EditTagBox shadow bgColor={palette.getColor(tag)}>
      <InputText
        ref={inputRef}
        bold
        noResize
        fontSize="l"
        height={1.25}
        padding="0"
        lineHeight={1.875}
        bgColor={palette.getColor(tag)}
        value={inputMemoName}
        onChange={onChangeMemoName}
      />

      <IconBox
        fontSize="l"
        bgColor={palette.getColor(tag)}
        onClick={() => onClickDoEditTag(tag)}
      >
        <Icon icon={faCheckCircle} />
      </IconBox>
    </EditTagBox>
  );
};

export default EditMemoName;

const EditTagBox = styled(RowBox)`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
`;
