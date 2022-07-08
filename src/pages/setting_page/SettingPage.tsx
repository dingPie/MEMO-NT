import React, { useEffect, useRef, useState } from "react";;
import { useNavigate } from "react-router";
import useStore from "../../store/useStore";
import Loading from "react-loading";
import Header from "../../components/Header";

import { User } from "firebase/auth";
import { FbAuth } from "../../firebase/firebase_auth_service";

import SetUser from "./setting_user/SetUser";
import SetToBeDeletedTime from "./setting_time/SetToBeDeletedTime";
import WithdrawConfirmPopup from "./setting_user/WithdrawConfirmPopup";
import SetUserContainer from "./setting_user/SetUserContainer";
import SetTimeContainer from "./setting_time/SetTimeContainer";



interface ISettingPage {
  fbAuth: FbAuth;
  user: User | null;
  setUser: (v: User | null) => void;
}

const SettingPage = ( { user, setUser, fbAuth }: ISettingPage ) => {
  
  const navigate = useNavigate();
  const { loading } = useStore();
  
  const [isOpenWithdrawPopup, setIsOpenWithdrawPopup] = useState(false);

  // 뒤로가기
  const onClickOtherBtn = () => navigate(-1)



  return(
      <>
        <Header page="setting" 
          onClickOtherBtn={onClickOtherBtn}
        />

        {/* 로그인 설정/관리 */}
        <SetUserContainer 
          fbAuth={fbAuth}
          user={user}
          setIsOpenWithdrawPopup={setIsOpenWithdrawPopup}
        />

        {/* 삭제예약 설정 */}
        <SetTimeContainer 
          fbAuth={fbAuth}
          user={user}
        />

        {/* 회원탈퇴 팝업 */}
        { isOpenWithdrawPopup &&
          <WithdrawConfirmPopup
          fbAuth={fbAuth}
          user={user}
          setIsOpenWithdrawPopup={setIsOpenWithdrawPopup}
          />
        }
        { loading.isLoading &&
          <Loading />
        }
      </>
  )
}

export default SettingPage;

