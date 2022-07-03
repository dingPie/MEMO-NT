import React, { useState } from "react";
import styled from "styled-components";

import { User } from "firebase/auth";
import Text from "../../components/Text";
import { ColBox, RowBox } from "../../components/FlexBox";
import { CustomBtn } from "../../components/Buttons";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";


interface ISetUser {
  user: User | null;
  onClickLogout: () => void;
}


const SetUser = ( { user, onClickLogout }: ISetUser ) => {

  const presentEmail = (user: User) => {
    if (user.providerData[0].email) return user.providerData[0].email
    else if (user.email) return user.email
  }
  

  const setUserComponent = () => {
    if (user) {
      return  (
        <>
          <RowBox 
            between align="center" 
            padding="0 .5rem"
          >
            <Text bold fontSize='xl' width={10}>
              연결된 계정
            </Text>
            <CustomBtn
              color="white"
              bgColor="#679BFF"
              padding=".25rem 1rem"
              height={2}
              onClick={onClickLogout}
            >
              로그아웃
            </CustomBtn>
          </RowBox>

          <UserBox>
            { user.photoURL ? 
              <ProfileImg src={user.photoURL} alt="" /> :
              <Icon 
                icon={faUserCircle} 
                size='3x' 
                color="#505050" 
              /> 
            }
            <ColBox gap={.1} padding="0">
              <Text
                bold
                fontSize="l"
                padding="0"
              >
                { user.displayName ? user.displayName : "사용자" }
              </Text>
              <Text 
                color="#505050" 
                padding="0"
              >
                {presentEmail(user)}
              </Text>
            </ColBox>
          </UserBox>

          <Text color="#505050">
            {user.providerData[0].providerId} 로 연결됨
          </Text>
        </>
      )
    } 
    
    else {
      return (
        <>
          <RowBox 
            between align="center" 
            padding="0"
          >
            <Text bold fontSize='xl'>
              연결된 계정
            </Text>
            <CustomBtn
              color="white"
              bgColor="#505050"
              padding=".25rem 1rem"
              height={2}
            >
              로그인
            </CustomBtn>
          </RowBox>

          <Text color="#505050">
            현재 연결된 계정이 없습니다. <br />
            계정을 연결하여 여러 환경에서 메모를 관리하세요        
          </Text>
        </>
      )
    }
  }



  return(
    <ColBox padding="1rem .5rem">
      {setUserComponent()}
    </ColBox>
  )
}

export default SetUser;

const UserBox = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  gap: 1.5rem;
  
  padding: .5rem .75rem;
  margin: 0 .5rem;
  height: 4rem;

  background: #FFFFFF;
  box-shadow: ${({theme}) => theme.boxShadow.main};
  border-radius: 2rem;
`

const ProfileImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 2.5rem;
  box-shadow: ${({theme}) => theme.boxShadow.main};
`