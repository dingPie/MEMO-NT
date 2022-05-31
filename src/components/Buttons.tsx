import styled, { css } from "styled-components";
import { darken, lighten } from 'polished';
import { polishedColor } from "../styles/stylesCss";

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