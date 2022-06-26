import { css, keyframes } from "styled-components";
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
    else if (size === '2x') fontSize = "1.5rem";
    else if (size === 'xl') fontSize = "1.25rem";
    else if (size === 'l') fontSize = "1rem";
    else if (size === 's') fontSize = ".75rem";
    else if (size === 'xs') fontSize = ".625rem";
    else if (size === 'm' || !size) fontSize = ".875rem";

    return css`
      font-size: ${fontSize};
    `
  }}
`
export interface IJustfiy {
  center?: boolean;
  right?: boolean;
  between?: boolean;
  align?: string
}

export const setJustify = css<IJustfiy>`
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

export const setTextLine = css<{whiteSpace?: string, lineClamp?: number}>`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: ${({lineClamp}) => lineClamp ? lineClamp : 1  };;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: ${({whiteSpace}) => whiteSpace ? whiteSpace : 'pre-wrap'  };
`


/* 
  키프레임 
*/

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`;

