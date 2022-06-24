import React from "react";
import styled from "styled-components";

import { InputText } from "../../../components/InputText"
import { RowBox } from "../../../components/FlexBox";
import { IconBox } from "../../../components/IconBox";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";


interface ITaklInput {
  value: string;
  onChangeInputMemo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClickInputBtn: () => void;
}

const TalkInput = ( { value, onChangeInputMemo, onClickInputBtn }: ITaklInput ) => {


  return (        
  <InputBox 
    padding=".75rem" 
  >
    <InputText
      value={value}
      onChange={onChangeInputMemo}
      maxHeight={5}
      placeholder="내용과 # 로 제목을 입력하세요"
    />
    <IconBox
      onClick={onClickInputBtn}
    >
      <Icon size="lg" color="#505050" 
        icon={faPlusSquare}
      />
    </IconBox>
  </InputBox>)

}

export default TalkInput;

const InputBox = styled(RowBox)`
  max-width: 30rem;
  align-items: center;
  background: white;
  justify-content: space-between;
`