import styled, { css } from "styled-components";
import { darken, lighten } from 'polished';
import { fontSizeSet, polishedColor } from "../styles/stylesCss";

interface IMainBtn {
  primary?: boolean;
  width?: number;
}


const modeSet = css<IMainBtn>`
  ${({ theme, primary }) => {
    const backColor = primary ? theme.colors.primary_blue : theme.colors.light_gray;
    const fontColor = primary && theme.colors.white;

    return css`
      background: ${backColor};
      color: ${fontColor};

      &:hover {
        background: ${lighten(0.02, backColor)};
      }
      &:active {
        background: ${darken(0.02, backColor)};
      }
    `;
  }}
`

export const MainBtn = styled.button<IMainBtn>`
/* 크기 */
  width:${({width}) => width ? width+"rem" : "5rem" };
  height: 1.5rem;
  padding: 0;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  /* 폰트 */
  font-size: 0.75rem;
  font-weight: 600;

  // 그림자 생성
  box-shadow: ${({theme}) => theme.boxShadow.main };
  
  /* 색상: 모드 */
  ${modeSet}
`

interface ICustomBtn {
  bgColor: string, 
  color?: string, 
  radius?: number,
  width?: number;
  padding?: string;
  whiteSpace?: string;

  fontSize?: string;
  bold?: boolean;
  center?: boolean;
  height?: number;
}

export const CustomBtn = styled.button<ICustomBtn>`

  /* 크기 */
  width: ${({width}) => width && width+"rem" };
  height: ${({height}) => height && height+"rem" };
  padding: ${({padding}) => padding ? padding : ".5rem" };
  border-radius: ${({radius}) => radius ? radius+"rem" : `.25rem` };
  border: none;

  cursor: pointer;

  /* 폰트 */
  ${fontSizeSet}
  font-weight: ${({bold}) => bold && "bold"};
  
  /* 그림자 */
  box-shadow: ${({theme}) => theme.boxShadow.main };
  /* 색상 */
  color: ${({color}) => color && color };
  ${polishedColor}

  
  /* overflow 속성 */
  /* display: -webkit-box;
  overflow-y: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: nowrap; */
`