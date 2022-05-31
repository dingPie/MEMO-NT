import { css } from "styled-components";
import { darken, lighten } from 'polished';


export const polishedColor = css<{bgColor: string}>`
  ${({ bgColor }) => {

    return css`
      background: ${bgColor};

      &:hover {
        background: ${lighten(0.05, bgColor)};
      }
      &:active {
        background: ${darken(0.05, bgColor)};
      }
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