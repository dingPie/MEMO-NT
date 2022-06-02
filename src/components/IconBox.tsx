import React from "react";
import { darken } from "polished";
import styled from "styled-components";

interface IIconBox {
  shadow?: boolean;
  width?: number;
  height?: number;
}


export const IconBox = styled.div<IIconBox>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({width}) => width ? width+"rem": "2rem" };
  height: ${({height}) => height ? height+"rem": "2rem" };
  background: ${({theme}) => theme.colors.white};
  border-radius: 2rem;

  ${({shadow}) => {
    return shadow && `box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(0, 0, 0, 0.05)`
  }};
  
  &:active {
    background: ${({theme}) => darken(0.05, theme.colors.white)};
  }
`