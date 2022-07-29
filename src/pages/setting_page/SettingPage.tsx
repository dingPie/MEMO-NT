import React, { useEffect, useRef, useState } from "react";;
import { useNavigate } from "react-router";
import useStore from "../../store/useStore";

import Header from "../../components/Header";
import Text from "../../components/Text";

import { User } from "firebase/auth";
import { FbAuth } from "../../firebase/firebase_auth_service";

import WithdrawConfirmPopup from "./setting_user/WithdrawConfirmPopup";
import SetUserContainer from "./setting_user/SetUserContainer";
import SetTimeContainer from "./setting_time/SetTimeContainer";
import Loading from "../../components/Loading";



interface ISettingPage {
  fbAuth: FbAuth;
  user: User;
}

const SettingPage = ( { user, fbAuth }: ISettingPage ) => {
  
  const navigate = useNavigate();
  const { loading } = useStore();
  
  const [isOpenWithdrawPopup, setIsOpenWithdrawPopup] = useState(false);

  // 뒤로가기
  const onClickOtherBtn = () => navigate(-1);



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
          setIsOpenWithdrawPopup={setIsOpenWithdrawPopup}
          />
        }
        <Text
          fontSize="s"
          padding="1rem"
        >
          오류 및 개선사항은<br />
          cpie1216@gmail.com 으로 문의 부탁드립니다. <br />
          감사합니다.
        </Text>
        { loading.isLoading &&
          <Loading />
        }
      </>
  )
}

export default SettingPage;

