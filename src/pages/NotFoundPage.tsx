import React from "react";
import { useNavigate } from "react-router";
import { MobileBox } from "../components/MobileBox";
import Text from "../components/Text"

const NotFoundPage = () => {

  const navigate = useNavigate();

  return (
    <MobileBox>
      <Text fontSize="xl">
        페이지를 찾을 수 없습니다.
      </Text>
      <Text
        onClick={() => navigate('/')}
      >
        돌아가기
      </Text>
    </MobileBox>
  )
}

export default NotFoundPage;