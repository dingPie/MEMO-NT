import React from "react";
import styled, { css } from "styled-components"
import { fontSizeSet } from "../styles/stylesCss";

interface IFlexPosition {
  center?: boolean;
  right?: boolean;
  between?: boolean;
  gap?: number;
  align?: string;
  padding?: string;
  width?: number;
  shadow?: boolean;
  radius?: number;
  height?: number;
  bgColor?: string;
  size?: string;
}

const setJustify = css<IFlexPosition>`
  ${({ center, right, between, align }) => {
    let justify = "flex-start";
    if (right) justify = "flex-end";
    else if (center) justify = "center";
    else if (between) justify ="space-between"

    return css`
      justify-content: ${ justify };
      align-items: ${ align && align }
    `;
  }}
`


export const RowBox = styled.div<IFlexPosition>`
  display: flex;
  flex-direction: row;
  gap: ${({gap}) => gap ? gap+"rem" : "1.5rem"};

  width: ${({width}) => width ? width+"rem" : "100%"};
  height: ${({height}) => height ? height+"rem" : "auto" };
  padding: ${({padding}) => padding ? padding : ".75rem 0"};

  background: ${({bgColor}) => bgColor && bgColor };
  border-radius: ${({radius}) => radius && radius+"rem" };
  ${({shadow}) => {
      return shadow && 'box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(0, 0, 0, 0.05)'
  }};

  ${setJustify};
  ${fontSizeSet};
`

export const ColBox = styled.div<IFlexPosition>`
  display: flex;
  flex-direction: column;
  gap: ${({gap}) => gap ? gap+"rem" : ".5rem"};

  width: ${({width}) => width ? width+"rem" : "100%"};
  padding: ${({padding}) => padding ? padding : ".75rem 0"};
  
  background: ${({bgColor}) => bgColor && bgColor };
  border-radius: ${({radius}) => radius && radius+"rem" };

  ${({shadow}) => {
      return shadow && 'box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(0, 0, 0, 0.05)'
  }};
  ${fontSizeSet};
`