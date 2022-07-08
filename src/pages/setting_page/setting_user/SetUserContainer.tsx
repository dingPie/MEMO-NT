import { User } from "firebase/auth";
import React, { useState } from "react";
import { FbAuth } from "../../../firebase/firebase_auth_service";
import SetUser from "./SetUser";


interface ISetUserContainer {
  user: User | null;
  fbAuth: FbAuth
  setIsOpenWithdrawPopup: (v: boolean) => void;
}

const SetUserContainer = ( { fbAuth, user, setIsOpenWithdrawPopup }: ISetUserContainer ) => {

    // 로그아웃
    const onClickLogout = () => {
      const confirm = window.confirm("현재 계정에서 로그아웃할까요?")
      if (confirm) fbAuth.logOut()
    }

    // 탈퇴버튼 클릭
    const onClickWithdrawBtn = () => {
      setIsOpenWithdrawPopup(true)
    }
    

  return (
    <>
      <SetUser 
        user={user!}
        onClickLogout={onClickLogout}
        onClickWithdrawBtn={onClickWithdrawBtn}
      />
    </>
  )
}

export default SetUserContainer;