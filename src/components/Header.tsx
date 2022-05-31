import React from "react";
import styled from "styled-components";
import { RowBox } from "./FlexBox";


import Text from "./Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faBox, faMessage, faReply } from "@fortawesome/free-solid-svg-icons";

interface IHeader {
  onClickGear?: (v: any) => void;
  otherIcon: string
  onClickOther?: (v: any) => void;
}

const Header = ( { onClickGear, otherIcon, onClickOther }: IHeader ) => {

  const Seticon = (otherIcon: string) => {
    switch (otherIcon) {
      case "talk" :
        return <FontAwesomeIcon icon={faMessage} size="lg" color="#679BFF" />
      case "grid" :
        return <FontAwesomeIcon icon={faBox} size="lg" color="#679BFF" />
      case "return":
        return <FontAwesomeIcon icon={faReply} size="lg" color="#679BFF" />
    }
    // if (otherIcon === "talk" ) 
  }

  return(
    <HeaderEle>
      <Text bold size='title' color='white'>
        Memo'nt
      </Text>

      <RowBox width={5} padding="0" gap={.5} between>
        <IconBox
          onClick={onClickGear}
        >
          <FontAwesomeIcon icon={faGear} size="lg" color="#679BFF" />
        </IconBox>
        <IconBox
          onClick={onClickOther}
        >
          {Seticon(otherIcon)}
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