import { css } from "styled-components";
import { darken, lighten } from 'polished';


export const polishedColor = css<{bgColor: string}>`
  ${({ bgColor }) => {

    return css`
      background: ${bgColor};

      &:hover {
        background: ${lighten(0.02, bgColor)};
      }
      &:active {
        background: ${darken(0.02, bgColor)};
      }
    `;
  }}
`

export const fontSizeSet = css<{size?: string}>`
  ${({ size }) => {
    let fontSize = "";
    if (size === "3x") fontSize = "2rem";
    else if (size === '2x') fontSize = "1.25rem";
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

export const overFlowHidden = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const center = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
`

export const oneLineText = css`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: pre-wrap;
`