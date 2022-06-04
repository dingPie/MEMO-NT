import React from "react";
import styled, { css } from "styled-components";
import { fontSizeSet } from "../styles/stylesCss";

interface Itext {
  size?: string;
  bold?: boolean;
  width?: number;
  height?: number;
  padding?: string;
  color?: string;
  bgColor?: string;
  radius?: number;
  shadow?: boolean;
  inline?: boolean;
  cursor?: boolean;
  center?: boolean;
}



const Text = styled.div<Itext>`

  // 크기
  width: ${({width}) => width && width+"rem" };
  height: ${({height}) => height && height+"rem" };
  line-height: ${({height}) => height && height+"rem" };
  padding: ${({padding}) => padding && ".5rem" };

  // 폰트
  font-weight: ${({bold}) => bold && "bold"};
  text-align: ${({center}) => center && "center" };
  ${fontSizeSet};

  // 배경, 색상
  color: ${({color}) => color && color };
  background: ${({bgColor}) => bgColor && bgColor };
  border-radius: ${({radius}) => radius ? radius+"rem" : `.25rem` };

  ${({inline}) => {
    return inline && 'display: inline-block'
  }};

  ${({cursor}) => {
    return cursor ? `cursor: pointer` : `cursor: auto`
  }}

  ${({shadow}) => {
      return shadow && 'box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(0, 0, 0, 0.05)'
  }};
`

export default Text;