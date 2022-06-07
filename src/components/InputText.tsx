import React, { useRef } from "react";
import styled, { css } from "styled-components";


interface IInputText extends IInputTextEle {
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  noResize?: boolean;
  onClick?: (e: React.MouseEvent<HTMLTextAreaElement>) => void;
}

export const InputText = ( { onClick, padding, lineHeight, value, defaultValue, onChange, noResize, placeholder, width, height, shadow, maxHeight, bold, bgColor }: IInputText) => {
  
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const resize = (ref: React.RefObject<HTMLTextAreaElement>) => {
    if (!ref.current || noResize) return
    ref.current.style.height = "auto" ; // 줄어들때 먼저 설정
    ref.current.style.height = ref.current.scrollHeight +"px";
  }
  
  
  return(
    <InputTextEle
      onKeyDown={() => resize(inputRef)}
      ref={inputRef}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onClick={onClick}
      // style
      placeholder={placeholder}
      width={width}
      height={height}
      bold={bold}
      shadow={shadow}
      maxHeight={maxHeight}
      bgColor={bgColor}
      padding={padding}
      lineHeight={lineHeight}
    />
  )
}

interface IInputTextEle {
  width?: number;
  height?: number;
  shadow?: boolean;
  maxHeight?: number;
  bold?: boolean;
  bgColor?: string;
  padding?: string;
  lineHeight?: number;
}

export const InputTextEle = styled.textarea<IInputTextEle>`  //["attrs"]
  width: ${({width}) => width ? width+"rem": "100%" };
  height: ${({height}) => height ? height+"rem": "auto" };
  line-height: ${({lineHeight}) => lineHeight ? lineHeight+"rem": "1.25rem" };
  max-height: ${({maxHeight}) => maxHeight ? maxHeight+"rem": "auto" };
  background: ${({bgColor}) => bgColor && bgColor };
  padding: ${({padding}) => padding && padding };
  font-size: .875rem;
  font-weight: ${({bold}) => bold && "bold"};

  border: none;
  outline: none;
  resize: none;

  ${({shadow}) => {
    return shadow && 'box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(0, 0, 0, 0.05)'
  }};
   
  // 스크롤바 설정
  &::-webkit-scrollbar {
    width: 0;
  }
  /* &::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: .375rem;
    background-clip: padding-box;
    border: 2px solid transparent;
  } */

`

  