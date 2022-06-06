import React from "react";

import { ColBox } from "../../components/FlexBox"
import Text from "../../components/Text"

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { LoginBtn } from "./LoginPage";

interface IWithoutLogin {
  onClickWithoutLogin: () => void;
}

const WithoutLogin = ( { onClickWithoutLogin }: IWithoutLogin ) => {


  return (
    <ColBox

    >
      <Text bold size="xl" >
        로그인 없이 이용하기
      </Text>

      <ColBox gap={.75}>
        <LoginBtn
          onClick={onClickWithoutLogin}
          bgColor="#F5F5F5"
        >
          <Icon size="lg" icon={faUserSlash} />
          <Text inline bold >
            Without Login
          </Text>
        </LoginBtn>
        <Text size="s">
          로컬 스토리지에 메모가 저장됩니다. <br/>
          사용 브라우저를 변경하거나 <br/>
          캐시 삭제시 기록된 메모가 삭제될 수 있습니다. <br/>
        </Text>
      </ColBox>
    </ColBox>
  )
}

export default WithoutLogin;