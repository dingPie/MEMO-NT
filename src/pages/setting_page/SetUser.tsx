import React, { useState } from "react";
import styled from "styled-components";

import Text from "../../components/Text";
import { ColBox, RowBox } from "../../components/FlexBox";
import { CustomBtn } from "../../components/Buttons";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

interface ISetUser {
  testUser: boolean;
}

const SetUser = ( { testUser }: ISetUser ) => {

  const setUserComponent = () => {
    if (testUser) {
      return  (
        <>
          <RowBox between>
            <Text bold size='xl'>
              연결된 계정
            </Text>
            <CustomBtn
              color="white"
              bgColor="#505050"
              padding=".25rem 1rem"
            >
              로그아웃
            </CustomBtn>
          </RowBox>

          <UserBox>
            <Icon icon={faUserCircle} size='2x' color="#505050" />
            <ColBox gap={.1} padding="0">
              <Text color="#505050">
                유저 이름
              </Text>
              <Text>
                tester@gmail.com
              </Text>
            </ColBox>
          </UserBox>

          <Text color="#505050">
            Google로 연결됨
          </Text>
        </>
      )
    } else {
      return (
        <>
        <RowBox between>
          <Text bold size='xl'>
            연결된 계정
          </Text>
          <CustomBtn
            color="white"
            bgColor="#505050"
            padding=".25rem 1rem"
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
  align-items: center;
  padding: .5rem .75rem;
  gap: 1.5rem;
  background: #FFFFFF;
  box-shadow: ${({theme}) => theme.boxShadow.main};
  border-radius: 2rem;
`