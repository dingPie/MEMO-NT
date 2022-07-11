import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

// Components
import Header from "../../components/Header";
import { ColBox } from "../../components/FlexBox";
import { CustomBtn } from "../../components/Buttons";
import Text from "../../components/Text";

// Page Component
import WithoutLogin from "./WithoutLogin";
import WithSnsLogin from "./WithSnsLogin";

// firebase
import { FbAuth } from "../../firebase/firebase_auth_service";
import { User } from "firebase/auth";
import useStore from "../../store/useStore";
import Loading from "react-loading";


interface ILoginPage {
  fbAuth: FbAuth;
  user: User | null;
  setUser: (v: User | null) => void;
}


const LoginPage = ( { fbAuth, user, setUser }: ILoginPage ) => {

  const navigate = useNavigate();
  const { loading } = useStore();

  const onClickWithoutLogin = () => {
    alert("작동안함")
    // navigate(`/talk`)
  }
  
  const onClickGoogleLlogin = async () => {
    await fbAuth.loginWithGoogle(setUser)
    navigate(`/talk`)
  }
  
  const onClickGithubLogin = async () => {
    await fbAuth.loginWithGithub(setUser)
    navigate(`/talk`)
  }
 
  return(
    <>
      <Header
        page="login"
      />
      <ColBox 
        gap={3.5} 
        padding="4rem 1.5rem"
      >
        <Text 
          center 
          bold 
          fontSize="3x" 
        >
          MEMO'NT
        </Text>
      
        {/* <WithoutLogin 
          onClickWithoutLogin={onClickWithoutLogin}
        /> */}
 
        <WithSnsLogin
          onClickGoogleLlogin={onClickGoogleLlogin}
          onClickGithubLogin={onClickGithubLogin}
        />
      </ColBox>
      { loading.isLoading &&
        <Loading />
      }
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