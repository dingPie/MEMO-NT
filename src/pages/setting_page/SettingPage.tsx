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
import SetBombTime from "./SetBombTime";
import { useNavigate } from "react-router";


const SettingPage = () => {
  
  const navigate = useNavigate();

  const onClickOtherBtn = () => {
    navigate(-1)
  }

  const [testUser, setTestUser] = useState(false)
 
  return(
    <>
      <Header page="setting" 
        onClickOtherBtn={onClickOtherBtn}
      />
      <MobileBox>
        {/* 로그인 설정/관리 */}
        <SetUser
          testUser={testUser}
        />
        {/* 삭제예약 설정 */}
        <SetBombTime 
        
        />

        <Text bold
          onClick={() =>setTestUser(!testUser)}
        >
          임시 로그인 버튼
        </Text>
      </MobileBox>
    </>
  )
}

export default SettingPage;

