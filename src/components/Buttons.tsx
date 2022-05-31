import styled, { css } from "styled-components";
import { darken, lighten } from 'polished';
import { polishedColor } from "../styles/stylesCss";

interface IMainBtn {
  dark?: boolean;
  width?: number;
}


const modeSet = css<IMainBtn>`
  ${({ theme, dark }) => {
    const backColor = dark ? theme.colors.dark_gray : theme.colors.light_gray;
    const fontColor = dark && theme.colors.white;

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
  width:${({width}) => width ? width+"rem" : "10rem" };
  height: 2.25rem;
  padding: 0;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  /* 폰트 */
  font-size: 0.875rem;
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
}

export const CustomBtn = styled.button<ICustomBtn>`

  /* 크기 */
  width:${({width}) => width && width+"rem"  };
  height: 2.25rem;
  padding: 0 1rem;
  border-radius: ${({radius}) => radius ? radius+"px" : `8px` };
  border: none;
  cursor: pointer;

  /* 폰트 */
  font-size: .875rem;
  font-weight: 600;
  
  /* 색상 */
  color: ${({color}) => color && color };
  ${polishedColor}
  
  /* 그림자 */
  box-shadow: ${({theme}) => theme.boxShadow.main };
`