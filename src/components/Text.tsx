import React from "react";
import styled, { css } from "styled-components";

interface Itext {
  size?: string;
  bold?: boolean;
  cursor?: boolean;
  center?: boolean;
  color?: string;
  width?: number;
  height?: number;
  inline?: boolean
}

const fontSizeSet = css<{size?: string}>`
  ${({ size }) => {
    let fontSize = "";
    if (size === "xxl") fontSize = "2.5rem";
    if (size === "xl") fontSize = "2rem";
    else if (size === 'l') fontSize = "1.5rem";
    else if (size === 's') fontSize = ".875rem";
    else if (size === 'm' || !size) fontSize = "1.125rem";

    return css`
      font-size: ${fontSize};
    `;
  }}
`

export const Text = styled.div<Itext>`
  font-weight: ${({bold}) => bold && "bold"};
  text-align:${({center}) => center && "center" };
  ${fontSizeSet};

  width:${({width}) => width && width+"rem" };
  height: ${({height}) => height && height+"rem" };
  line-height: ${({height}) => height && height+"rem" };

  color:${({color}) => color && color };

  ${({inline}) => {
    return inline && 'display: inline-block'
  }};

  ${({cursor}) => {
    return cursor ?  `cursor: pointer` : `cursor: auto`
  }}
`



// 사이즈 관련 재정비 필요 
// 32 24 18 14 xl l m s
// 12 14 18 24 