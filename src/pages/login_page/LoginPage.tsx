import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

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

  const navigate = useNavigate();

  const onClickWithoutLogin = () => {
    // localStorage로 tag / memo set
    console.log("localStorage로 로그인...")
    navigate(`/talk`)
  }

  const onClickGoogleLlogin = () => {
    // firebase google 로그인 로직
    // 로그인 한 정보로 tag / memo / user set
    console.log("firebase google로 로그인...")
    navigate(`/talk`)
  }

  const onClickGithubLogin = () => {
    // firebase github 로그인 로직
    // 로그인 한 정보로 tag / memo / user set
    console.log("firebase github으로 로그인...")
    navigate(`/talk`)
  }
 
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
      
        <WithoutLogin 
          onClickWithoutLogin={onClickWithoutLogin}
        />
 
        <WithSnsLogin
          onClickGoogleLlogin={onClickGoogleLlogin}
          onClickGithubLogin={onClickGithubLogin}
        />

      </ColBox>
    </MobileBox>
    </>
  )
}

export default LoginPage;

export const LoginBtn = styled(CustomBtn)`
  width: 100%;
  display: grid;
  grid-template-columns: 2rem 1fr;
  align-items: center;
  padding: 0 1rem;
`