import React from "react";
import styled from "styled-components";
import { RowBox } from "./FlexBox";
import { faCheckSquare, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";

import Text from "./Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faBox } from "@fortawesome/free-solid-svg-icons";

const Header = () => {

  return(
    <HeaderEle>
      <Text bold size='title' color='white'>Memo'nt</Text>
      <RowBox width={5} padding="0" gap={.5} between>
        <IconBox>
        <FontAwesomeIcon icon={faGear} size="lg" width="24px" color="#679BFF" />
        </IconBox>
        <IconBox>
        <FontAwesomeIcon icon={faBox} size="lg" width="24px" color="#679BFF" />
        </IconBox>
      </RowBox>
    </HeaderEle>
  )
}

export default Header;

const HeaderEle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: .5rem 1rem;
  margin: 0 auto;
  max-width: 480px; 
  width: 100%;
  height: 3rem;
`

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2rem;
  height: 2rem;
  background: ${({theme}) => theme.colors.white} ;
  border-radius: 2rem ;
`