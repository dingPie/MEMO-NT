import React, { memo } from "react";
import styled from "styled-components";
import { RowBox } from "./FlexBox";

import Text from "./Text";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faGear, faBox, faMessage, faReply } from "@fortawesome/free-solid-svg-icons";
import { IconBox } from "./IconBox";
import { useNavigate } from "react-router";

interface IHeader {
  page: string
  onClickGear?: () => void;
  onClickOtherBtn?: () => void;
}

const Header = ( { page, onClickGear, onClickOtherBtn }: IHeader ) => {
  
  const navigate = useNavigate();

  const onClickGaerBtn = () => {
    navigate('/setting')
  }


  const setIcons = (page: string) => {
    switch (page) {
      case "talk" :
        return (
          <>
            <IconBox
              height={2}
              width={2}
              onClick={onClickGaerBtn}
            >
              <Icon icon={faGear} size="lg" color="#679BFF" />
            </IconBox>
            <IconBox
              height={2}
              width={2}
              onClick={onClickOtherBtn}
            >
              <Icon icon={faBox } size="lg" color="#679BFF" />
            </IconBox>
          </>
        ) 
      case "grid" :
        return (
          <>
            <IconBox
              height={2}
              width={2}
              onClick={onClickGaerBtn}
            >
              <Icon icon={faGear} size="lg" color="#679BFF" />
            </IconBox>
            <IconBox
              height={2}
              width={2}
              onClick={onClickOtherBtn}
            >
              <Icon icon={faMessage} size="lg" color="#679BFF" />
            </IconBox>
          </>
        ) 
      case "memo":
        return (
          <>
            <IconBox
              height={2}
              width={2}
              onClick={onClickGaerBtn}
            >
              <Icon icon={faGear} size="lg" color="#679BFF" />
            </IconBox>
            <IconBox
              height={2}
              width={2}
              onClick={onClickOtherBtn}
            >
             <Icon icon={faReply} size="lg" color="#679BFF" />
            </IconBox>
          </>
        ) 
      case "setting":
        return (
          <>
            <IconBox
              height={2}
              width={2}
              onClick={onClickOtherBtn}
            >
             <Icon icon={faReply} size="lg" color="#679BFF" />
            </IconBox>
          </>
        ) 
    }
  }

  return(
    <HeaderEle>
      <Text bold fontSize='2x' color='white'>
        MEMO'NT
      </Text>
      <RowBox 
        width={5} 
        padding="0" 
        gap={.75} 
        justifyEnd
      >
        {setIcons(page)}
      </RowBox>
    </HeaderEle>
  )
}

export default memo(Header);

const HeaderEle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem;
  margin: 0 auto;
  max-width: 30rem; 
  width: 100%;
  height: 3.5rem;

  background: ${({theme}) => theme.colors.primary_blue};
`