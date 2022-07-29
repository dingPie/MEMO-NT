import React from "react";
import styled from "styled-components";
import { ColBox } from "../../components/FlexBox";
import theme from "../../styles/theme";

import Text from '../../components/Text';


interface IIndexPage {

}

const IndexPage = ( {}: IIndexPage ) => {

  return(
    <>
      <IndexBox>
        <Text
          bold
          fontSize="3x"
          color="white"
        >
          MEMO'NT
        </Text>
      </IndexBox>
    </>
  )
}

export default IndexPage;

const IndexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height:100%;
  background: ${ ({theme}) => theme.colors.primary_blue};
`