import React from "react";
import styled from "styled-components";
import { ColBox } from "../../components/FlexBox";
import theme from "../../styles/theme";

import Text from "../../components/Text";

const IndexPage = () => {
  return (
    <>
      <IndexBox>
        <LogoBox>
          <img src="./logo192.png" alt="" />
        </LogoBox>
        <Text bold fontSize="title" color="white">
          MEMO'NT
        </Text>
      </IndexBox>
    </>
  );
};

export default IndexPage;

const IndexBox = styled(ColBox)`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.primary_blue};
`;

const LogoBox = styled.div`
  padding: 1rem;
  background: white;
  border-radius: 2rem;
`;
