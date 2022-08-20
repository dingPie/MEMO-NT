import { css, keyframes } from "styled-components";
import { darken, lighten } from 'polished';

export interface IFlexLayout {
  justifyCenter?: boolean;
  justifyEnd?: boolean;
  justifyBetween?: boolean;
  alignEnd?: boolean;
  alignCenter?: boolean;
  alignBetween?: boolean;
}
/**
 * flex 레이아웃 설정을 위한 props 모음
 */
export const setFlexLayout = css<IFlexLayout>`
${({ justifyCenter, justifyEnd, justifyBetween, alignEnd, alignCenter, alignBetween }) => {
  let justify = "flex-start";
  if (justifyEnd) justify = "flex-end";
  else if (justifyCenter) justify = "center";
  else if (justifyBetween) justify ="space-between";
  let align = "flex-start";
  if (alignEnd) align = "flex-end";
  else if (alignCenter) align = "center";
  else if (alignBetween) align ="space-between";
  return css`
    justify-content: ${ justify };
    align-items: ${ align }
  `;
}}
`


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

export const fontSizeSet = css<{fontSize?: string}>`
  ${({ fontSize }) => {
    let result = "";
    if (fontSize === "3x") result = "2rem";
    else if (fontSize === 'title') result = "3rem";
    else if (fontSize === '2x') result = "1.5rem";
    else if (fontSize === 'xl') result = "1.25rem";
    else if (fontSize === 'l') result = "1rem";
    else if (fontSize === 's') result = ".75rem";
    else if (fontSize === 'xs') result = ".625rem";
    else if (fontSize === 'm' || !fontSize) result = ".875rem";

    return css`
      font-size: ${result};
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

  ${overFlowHidden};

  text-overflow: ellipsis;
  white-space: ${({whiteSpace}) => whiteSpace ? whiteSpace : 'pre-wrap'  };
`


/* 
  키프레임 
*/

export const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;
export const fadeOut = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
`;

export const slideUp = keyframes`
  from {
    transform-origin: 100% 0;
    transform: translateY(200px);
  }
  to {
    transform-origin: 100% 0;
    transform: translateY(0px);
  }
`;

export const stretchY = keyframes`
  from {
    transform-origin: 100% 0;
    transform: scaleY(.2);
  }
  to {
    transform-origin: 100% 0;
    transform: scaleY(1);
  }
`;

export const shrinkY = keyframes`
  from {
    transform-origin: 100% 0;
    transform: scaleY(1);
  }
  to {
    transform-origin: 100% 0;
    transform: scaleY(.5);
  }
`;


  export const stretchX = keyframes`
    from {
      transform-origin: 0 100%;
      transform: scaleX(.2);
    }
    to {
      transform-origin: 0 100%;
      transform: scaleX(1);
    }
  `;
  
  export const shrinkX = keyframes`
  from {
    transform-origin: 0 100%;
    transform: scaleX(1);
  }
  to {
    transform-origin: 0 100%;
    transform: scaleX(.2);
  }
`;

export const expandPinnBox = (height: number) => keyframes`
  from {
    height: 44px;
  }
  to {
    height: ${height}px;
  }
`;

export const reducePinnBox = (height: number) => keyframes`
  from {
    height: ${height}px;
  }
  to {
    height: 44px;
  }
`;