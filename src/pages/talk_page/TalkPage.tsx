import React from "react";
import styled from "styled-components";
import { MobileBox } from "../../App";


import { RowBox } from "../../components/FlexBox";
import Header, { IconBox } from "../../components/Header";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

import { InputText } from "../../components/InputText";
import Text from "../../components/Text"


const TalkPage = () => {

  
  return(
    <>
      <Header 
        page="talk"
      />

      <MobileBox>
        <Text>

        톡 페이지입니다.
        </Text>
        <InputBox padding=".75rem">
          <InputText
            placeholder="내용과 # 로 제목을 입력하세요"
          />
          <IconBox>
            <Icon icon={faPlusSquare} size="lg" color="#505050" />

          </IconBox>
        </InputBox>

      </MobileBox>

    </>
  )
}

export default TalkPage;

const InputBox = styled(RowBox)`
  align-items: center;
  position: fixed;
  bottom: 0;
  max-width: 30rem;
  /* width: 100%; */
  background: white;
`