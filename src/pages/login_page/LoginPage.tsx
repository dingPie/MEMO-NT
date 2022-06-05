import React from "react";
import styled from "styled-components";

// Components
import Header from "../../components/Header";
import { MobileBox } from "../../components/MobileBox";
import { ColBox } from "../../components/FlexBox";
import { CustomBtn } from "../../components/Buttons";
import Text from "../../components/Text";

// Page Component
import WithoutLogin from "./WithoutLogin";
import WithSnsLogin from "./WithSnsLogin";

const LoginPage = () => {
 
  return(
    <>
    <Header
      page="login"
    />
    <MobileBox>
      <ColBox gap={3.5} padding="4rem 1.5rem">
        <Text center bold size="3x" >
          LOGIN
        </Text>
      
        <WithoutLogin />
 
        <WithSnsLogin />

      </ColBox>
    </MobileBox>
    </>
  )
}

export default LoginPage;

export const LoginBtn = styled(CustomBtn)`
  width: 100%;
  display: grid;
  grid-template-columns: 2rem 1fr ;
`