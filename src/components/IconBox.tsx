import React from "react";
import { darken } from "polished";
import styled from "styled-components";
import { fontSizeSet, polishedColor } from "../styles/stylesCss";

interface IIconBox {
  shadow?: boolean;
  width?: number;
  height?: number;
  bgColor?: string;
  inline?: boolean;
  fontSize?: number;
  size?: string;
}


export const IconBox = styled.div<IIconBox>`
  display: flex;
  justify-content: center;
  align-items: center;

  /* font-size: ${({fontSize}) => fontSize ? fontSize+"rem": "1rem" }; */
  ${fontSizeSet}
  font-weight: bold;
  
  width: ${({width}) => width ? width+"rem": "1.75rem" };
  min-width: ${({width}) => width && width+"rem"}; // width가 작게 표기 될때를 방지하기 위함
  height: ${({height}) => height ? height+"rem": "1.75rem" };

  background: ${({theme}) => theme.colors.white};
  border-radius: 2rem;
  background: ${({bgColor}) => bgColor && bgColor };
  ${({inline}) =>  inline && 'display: inline-block' };
  ${({shadow}) => {
    return shadow && `box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(0, 0, 0, 0.05)`
  }};
  
  &:active {
    background: ${({theme, bgColor}) => bgColor ? darken(0.05, bgColor) : darken(0.05, theme.colors.white) };
  }

`