import React, { ReactNode, memo } from "react";
import styled, { css } from "styled-components";
import { center } from "../styles/stylesCss";
import { MainBtn } from "./Buttons";
import { RowBox } from "./FlexBox";
import { Text } from './Text'


interface IPopup {
  children: ReactNode;
  title: string;
  onClickCancel?: () => void;
  gap?: number;
  onClickDo?: () => void;
}

const Popup = ( { children, title, onClickCancel, onClickDo, gap }: IPopup) => {

  return (
    <Outer>
      <Inner gap={gap}>

      <Text size='l' bold> {title} </Text>
      
        {children}

        <RowBox center >
          <MainBtn width={12.5}
            onClick={onClickCancel}
          > 취소
          </MainBtn>
          <MainBtn width={12.5} dark
            onClick={onClickDo}
          > 확인
          </MainBtn>
        </RowBox>

      </Inner>
    </Outer>
  )
}

export default memo(Popup)

interface IInner {
  gap?: number;
}

export const Inner = styled.div<IInner>`
  // 정렬
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: ${({gap}) => gap ? gap+"rem" : "1rem"};

  // size
  width: 20rem;
  height: 10rem;
  padding: 1.5rem 1rem;
  box-shadow: ${({theme}) => theme.boxShadow.main};
  
  z-index: 3;
  background: white;
  border-radius: .25rem;
  ${center} // 중앙정렬
`

const Outer = styled.div`
  position: fixed;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .25);
`