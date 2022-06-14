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

// firebase
import { FbAuth } from "../../firebase/firebase_auth_service";
import { firebaseAuth, fireStoreDB } from "../../firebase/firebase_config";
import { Props } from "../../App";

interface ILoginPage extends Props {

}

const LoginPage = ( { user, setUser }: ILoginPage ) => {


  // 인스턴스 생성을... app이나 index에서 해주고 user정보를 하위에서 받아올까?
  const fbAuth = new FbAuth(firebaseAuth, fireStoreDB);
  const navigate = useNavigate();



  const onClickWithoutLogin = () => {
    console.log("localStorage로 로그인...")
    alert("작동안함")
    // navigate(`/talk`)
  }
  
  const onClickGoogleLlogin = async () => {
    console.log("firebase google로 로그인...")
    await fbAuth.loginWithGoogle(setUser)
    navigate(`/talk`)
  }
  
  const onClickGithubLogin = async () => {
    console.log("firebase github으로 로그인...")
    await fbAuth.loginWithGithub(setUser)
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