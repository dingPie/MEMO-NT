import React from "react";
import { darken } from "polished";
import styled from "styled-components";
import {
  fontSizeSet,
  IJustfiy,
  polishedColor,
  setJustify,
  setTextLine,
} from "../styles/stylesCss";

interface IIconBox {
  shadow?: boolean;
  width?: number;
  height?: number;
  bgColor?: string;
  inline?: boolean;
  fontSize?: string;
}

export const IconBox = styled.div<IIconBox>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${fontSizeSet}
  font-weight: bold;

  width: ${({ width }) => (width ? width + "rem" : "2rem")};
  min-width: ${({ width }) =>
    width && width + "rem"}; // width가 작게 표기 될때를 방지하기 위함
  height: ${({ height }) => (height ? height + "rem" : "2rem")};
  min-height: ${({ height }) => height && height + "rem"};

  border-radius: 2rem;
  background: ${({ bgColor }) => (bgColor ? bgColor : "white")};
  ${({ inline }) => inline && "display: inline-block"};
  ${({ shadow }) => {
    return (
      shadow &&
      `box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(0, 0, 0, 0.05)`
    );
  }};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:active {
    background: ${({ theme, bgColor }) =>
      bgColor ? darken(0.05, bgColor) : darken(0.05, theme.colors.white)};
  }
`;
