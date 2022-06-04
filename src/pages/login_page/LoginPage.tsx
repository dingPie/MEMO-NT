import React from "react";
import Header from "../../components/Header";
import { MobileBox } from "../../components/MobileBox";


const LoginPage = () => {
 
  return(
    <>
    <Header
      page="login"
    />
    <MobileBox>
      로그인페이지입니다.

    </MobileBox>
    </>
  )
}

export default LoginPage;