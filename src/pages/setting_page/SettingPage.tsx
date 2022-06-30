import React, { useState } from "react";
import styled from "styled-components";
import { CustomBtn } from "../../components/Buttons";
import { ColBox, RowBox } from "../../components/FlexBox";
import Header from "../../components/Header";
import { MobileBox } from "../../components/MobileBox";
import Text from "../../components/Text";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Select from "../../components/Select";
import SetUser from "./SetUser";
import SetToBeDeletedTime from "./SetToBeDeletedTime";
import { useNavigate } from "react-router";
import { User } from "firebase/auth";
import { FbAuth } from "../../firebase/firebase_auth_service";
import Loading from "react-loading";
import useStore from "../../store/useStore";


interface ISettingPage {
  fbAuth: FbAuth;
  user: User | null;
  setUser: (v: User | null) => void;
}

const SettingPage = ( { user, setUser, fbAuth }: ISettingPage ) => {
  
  const navigate = useNavigate();
  const { loading } = useStore();

  const onClickOtherBtn = () => {
    navigate(-1)
  }

  const onClickLogout = () => {
    fbAuth.logOut()
  }

 
  return(
      <>
        <Header page="setting" 
          onClickOtherBtn={onClickOtherBtn}
        />
        {/* 로그인 설정/관리 */}
        <SetUser
          user={user}
          onClickLogout={onClickLogout}
        />
        {/* 삭제예약 설정 */}
        {/* <SetToBeDeletedTime /> */}
        { loading.isLoading &&
        <Loading />
      }
      </>
  )
}

export default SettingPage;

