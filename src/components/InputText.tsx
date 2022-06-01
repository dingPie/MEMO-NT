import React, { useRef } from "react";
import styled, { css } from "styled-components";


interface IInputText extends IInputTextEle {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement> |  React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

export const InputText = ( { value, onChange, placeholder, width, height, shadow }: IInputText) => {
  
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const resize = (ref: React.RefObject<HTMLTextAreaElement>) => {
    if (!ref.current) return
    ref.current.style.height = 'auto'; // 줄어들때 먼저 설정
    ref.current.style.height = ref.current.scrollHeight +"px";
  }
  
  
  return(
    <InputTextEle
      onKeyDown={() => resize(inputRef)}
      ref={inputRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      width={width}
      height={height}
      shadow={shadow}
    />
  )
}

interface IInputTextEle {
  width?: number;
  height?: number;
  shadow?: boolean;
}

export const InputTextEle = styled.textarea<IInputTextEle>`  //["attrs"]
  width:${({width}) => width ? width+"rem": "100%" };
  height: auto;
  line-height: 1.25rem;
  font-size: .875rem;
  max-height: 5rem ;
  
  border: none;
  outline: none;
  resize: none;

  ${({shadow}) => {
    return shadow && 'box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1), -2px -2px 4px rgba(0, 0, 0, 0.05)'
  }};
   
  // 스크롤바 설정
  &::-webkit-scrollbar {
    width: .375rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: .375rem;
    background-clip: padding-box;
    border: 2px solid transparent;
  }

`

  