import React, { ReactNode, memo } from "react";
import styled, { css } from "styled-components";
import { center } from "../styles/stylesCss";
import Text from "./Text";

import ReactLoading from "react-loading";

interface ILoading {
  title?: string;
}

const Loading = ({ title }: ILoading) => {
  return (
    <Outer>
      <Inner>
        <Text bold center fontSize="xl" padding="0" color="#679BFF">
          Loading... {title}
        </Text>
        <ReactLoading
          type={"cylon"}
          color={"#679BFF"}
          height={"40%"}
          width={"40%"}
        />
      </Inner>
    </Outer>
  );
};

export default memo(Loading);

interface IInner {
  gap?: number;
}

export const Inner = styled.div<IInner>`
  // 정렬
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  gap: ${({ gap }) => (gap ? gap + "rem" : ".5rem")};

  ${center}; // 중앙정렬

  // size
  width: 12rem;
  min-height: 6rem;
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.boxShadow.main};

  z-index: 20;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 0.25rem;
`;

const Outer = styled.div`
  position: fixed;
  z-index: 8;
  left: 0;
  width: 100vw;
  height: 100vh;
`;
