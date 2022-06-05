import React from "react";
import styled, { css } from "styled-components"

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
  padding: ${({padding}) => padding ? padding : ".75rem 0"};

  ${({shadow}) => {
      return shadow && 'box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(0, 0, 0, 0.05)'
  }};
   border-radius: ${({radius}) => radius && radius+"rem" };

  ${setJustify}
  `

export const ColBox = styled.div<IFlexPosition>`
  display: flex;
  flex-direction: column;
  padding: ${({padding}) => padding ? padding : ".75rem 0"};

  width: 100%;
  gap: ${({gap}) => gap ? gap+"rem" : ".5rem"};

  ${({shadow}) => {
      return shadow && 'box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(0, 0, 0, 0.05)'
  }};
  border-radius: ${({radius}) => radius && radius+"rem" };
`