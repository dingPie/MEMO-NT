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
  inline?: boolean;
}

const fontSizeSet = css<{size?: string}>`
  ${({ size }) => {
    let fontSize = "";
    if (size === "title") fontSize = "1.5rem";
    else if (size === 'xl') fontSize = "1.25rem";
    else if (size === 'l') fontSize = "1rem";
    else if (size === 's') fontSize = ".75rem";
    else if (size === 'xs') fontSize = ".625rem";
    else if (size === 'm' || !size) fontSize = ".875rem";

    return css`
      font-size: ${fontSize};
    `;
  }}
`

const Text = styled.div<Itext>`
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
    return cursor ? `cursor: pointer` : `cursor: auto`
  }}
`

export default Text;