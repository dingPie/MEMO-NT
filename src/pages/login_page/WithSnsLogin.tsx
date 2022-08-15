import React from "react";
import { ColBox } from "../../components/FlexBox";
import { LoginBtn } from "./LoginPage";
import Text from "../../components/Text";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";

interface IWithSnsLogin {
  onClickGoogleLlogin: () => void;
  onClickGithubLogin: () => void;
}

const WithSnsLogin = ( { onClickGoogleLlogin, onClickGithubLogin }: IWithSnsLogin ) => {

  return(
    <ColBox>
      <Text bold fontSize="xl" >
        소셜 로그인으로 이용하기
      </Text>

      <ColBox gap={.75}>
        <LoginBtn
          bgColor="#F5F5F5"
          onClick={onClickGoogleLlogin}
        >
          <Icon size="lg" icon={faGoogle} />
          <Text inline bold >
            Login With Google
          </Text>
        </LoginBtn>

        <LoginBtn
          bgColor="#505050"
          onClick={onClickGithubLogin}
        >
          <Icon size="lg" icon={faGithub} color="white" />
          <Text inline color="white" >
            Login With Github
          </Text>
        </LoginBtn>

        <Text fontSize="s">
          메모 목록은 Google의 Firebase 저장소에 저장됩니다. <br/>
          탈퇴시 저장된 메모 목록은 즉시 삭제됩니다. <br/>
          <br/>
          사용 이메일 및 uid를 제외한 정보는 따로 수집되지 않습니다 <br/>
        </Text>

      </ColBox>
    </ColBox>

  )
}

export default WithSnsLogin;