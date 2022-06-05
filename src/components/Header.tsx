import React from "react";
import styled from "styled-components";
import { RowBox } from "./FlexBox";

import Text from "./Text";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faGear, faBox, faMessage, faReply } from "@fortawesome/free-solid-svg-icons";
import { darken } from "polished";
import { IconBox } from "./IconBox";

interface IHeader {
  page: string
  onClickGear?: (v: any) => void;
  onClickOther?: (v: any) => void;
}

const Header = ( { page, onClickGear, onClickOther }: IHeader ) => {

  const setIcons = (page: string) => {
    switch (page) {
      case "talk" :
        return (
          <>
            <IconBox
              onClick={onClickGear}
            >
              <Icon icon={faGear} size="lg" color="#679BFF" />
            </IconBox>
            <IconBox
              onClick={onClickOther}
            >
              <Icon icon={faBox } size="lg" color="#679BFF" />
            </IconBox>
          </>
        ) 
      case "grid" :
        return (
          <>
            <IconBox
              onClick={onClickGear}
            >
              <Icon icon={faGear} size="lg" color="#679BFF" />
            </IconBox>
            <IconBox
              onClick={onClickOther}
            >
              <Icon icon={faMessage} size="lg" color="#679BFF" />
            </IconBox>
          </>
        ) 
      case "memo":
        return (
          <>
            <IconBox 
              onClick={onClickGear}
            >
              <Icon icon={faGear} size="lg" color="#679BFF" />
            </IconBox>
            <IconBox
              onClick={onClickOther}
            >
             <Icon icon={faReply} size="lg" color="#679BFF" />
            </IconBox>
          </>
        ) 
      case "setting":
        return (
          <>
            <IconBox
              onClick={onClickOther}
            >
             <Icon icon={faReply} size="lg" color="#679BFF" />
            </IconBox>
          </>
        ) 
    }
  }

  return(
    <HeaderEle>
      <Text bold size='2x' color='white'>
        Memo'nt
      </Text>
      <RowBox width={5} padding="0" gap={.75} right>
        {setIcons(page)}
      </RowBox>
    </HeaderEle>
  )
}

export default Header;

const HeaderEle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem;
  margin: 0 auto;
  max-width: 480px; 
  width: 100%;
  height: 3.5rem;

  background: ${({theme}) => theme.colors.primary_blue};
`