import React from "react";
import { InputText } from "../../components/InputText"
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { RowBox } from "../../components/FlexBox";
import Header from "../../components/Header";
import styled from "styled-components";
import { IconBox } from "../../components/IconBox";


const TalkInput = () => {

  return (        
  <InputBox padding=".75rem">
    <InputText
      maxHeight={5}
      placeholder="내용과 # 로 제목을 입력하세요"
    />
    <IconBox>
      <Icon size="lg" color="#505050" 
        icon={faPlusSquare}
      />
    </IconBox>
  </InputBox>)
}

export default TalkInput;

const InputBox = styled(RowBox)`
  position: fixed;
  align-items: center;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  max-width: 30rem;
  background: white;
  justify-content: space-between;
`