import React from "react";
import { ColBox } from "../../components/FlexBox";
import { LoginBtn } from "./LoginPage";
import Text from "../../components/Text";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";


const WithSnsLogin = () => {

  return(
    <ColBox>
    <Text bold size="xl" >
      로그인하여 이용하기
    </Text>

    <ColBox gap={.75}>
      <LoginBtn
        bgColor="#F5F5F5"
      >
        <Icon size="lg" icon={faGoogle} />
        <Text inline bold >
          Login With Google
        </Text>
      </LoginBtn>

      <LoginBtn
        bgColor="#505050"
      >
        <Icon size="lg" icon={faGithub} color="white" />
        <Text inline color="white" >
          Login With Github
        </Text>
      </LoginBtn>

      <Text size="s">
        메모 정보는Google의 Firebase에 저장됩니다. <br/>
        유저 정보 또한 Firebase에 암호화되어 저장됩니다.
      </Text>

    </ColBox>
  </ColBox>

  )
}

export default WithSnsLogin;