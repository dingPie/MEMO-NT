import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CustomBtn } from "../../components/Buttons";
import { ColBox, RowBox } from "../../components/FlexBox";
import Header from "../../components/Header";
import { MobileBox } from "../../components/MobileBox";
import Text from "../../components/Text";


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
  
  
  
  const [toBeDeleteTime, setToBeDeleteTime] = useState(5);
  
  const navigate = useNavigate();
  const { loading } = useStore();
  
  useEffect(() => {
   // 삭제시간 초기설정 (데이터받아옴)
    const setInitToBeDeleteTime = async () => {
      if (!user) return
      const nowUser = await fbAuth.getUserInfo(user.uid)
      setToBeDeleteTime(nowUser.toBeDeletedTime)
    }
    setInitToBeDeleteTime()
  }, [])
  

  // 뒤로가기
  const onClickOtherBtn = () => navigate(-1)
  

  // 로그아웃
  const onClickLogout = () => {
    const confirm = window.confirm("현재 계정에서 로그아웃할까요?")
    if (confirm) fbAuth.logOut()
  }

  // 삭제시간 설정로직
  const onClickSetDeleteTimeBtn = async () => {
    await fbAuth.updatetoBeDeletedTime(user!.uid, toBeDeleteTime)
  }


  // 삭제시간 상태변경
  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => setToBeDeleteTime(parseInt(e.target.value))

 
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
        <SetToBeDeletedTime 
          onClickSetDeleteTimeBtn={onClickSetDeleteTimeBtn}
          toBeDeleteTime={toBeDeleteTime}
          onChangeSelect={onChangeSelect}

        />
        { loading.isLoading &&
        <Loading />
      }
      </>
  )
}

export default SettingPage;

