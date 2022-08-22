import React, { ReactNode, memo } from "react";
import styled, { css } from "styled-components";
import { center } from "../styles/stylesCss";
import { MainBtn } from "./Buttons";
import { RowBox } from "./FlexBox";
import Text from './Text'


interface IPopup {
  children: ReactNode;
  title: string;
  onClickCancel?: () => void;
  onClickDo?: (v: any) => void;
  cancelBtnName?: string;
  doBtnName?: string;

  gap?: number;
  zIndex?: number;
  noBackground?: boolean;
}

const Popup = ( { children, title, onClickCancel, onClickDo, cancelBtnName, doBtnName, gap, zIndex, noBackground }: IPopup) => {

  return (
    <>
      { noBackground ?
          <Inner
            gap={gap}
            zIndex={zIndex}
            noBackground={noBackground}
          >
          <Text bold center fontSize='xl' padding="0" >
            {title}
          </Text>
            {children}
            <RowBox justifyCenter padding="0" >
              <MainBtn
                onClick={onClickCancel}
              > 
                { cancelBtnName ? cancelBtnName : "취소" }
              </MainBtn>
              <MainBtn primary
                onClick={onClickDo}
              > 
                { doBtnName ? doBtnName : "확인" }
              </MainBtn>
            </RowBox>
          </Inner>
      :
        <Outer>
          <Inner
            gap={gap}
            zIndex={zIndex}
            noBackground={noBackground}
          >

          <Text bold center fontSize='xl' padding="0" >
            {title}
          </Text>
            {children}
            <RowBox justifyCenter padding="0" >
              <MainBtn
                onClick={onClickCancel}
              > { cancelBtnName ? cancelBtnName : "취소" }
              </MainBtn>
              <MainBtn primary
                onClick={onClickDo}
              > { doBtnName ? doBtnName : "확인" }
              </MainBtn>
            </RowBox>
          </Inner>
        </Outer>
      }
    </>

  )
}

export default memo(Popup)

interface IInner {
  gap?: number;
  zIndex?: number;
  noBackground?: boolean;
}

export const Inner = styled.div<IInner>`
  // 정렬
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: ${({gap}) => gap ? gap+"rem" : ".5rem"};

  ${center}; // 중앙정렬

  // fontSize
  width: 17.5rem;
  min-height: 10rem;
  padding: 1rem;
  box-shadow: ${({theme, noBackground}) => !noBackground ? theme.boxShadow.main : "none" };
  
  z-index:${({zIndex}) => zIndex ? zIndex : 3 };
  background: white;
  border-radius: .25rem;
`

const Outer = styled.div`
  position: fixed;
  z-index: 8;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .25);
`