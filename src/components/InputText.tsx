import React, { forwardRef, memo, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { fontSizeSet } from "../styles/stylesCss";


interface IInputTextEle {
  width?: number;
  height?: number;
  shadow?: boolean;
  maxHeight?: number;
  bold?: boolean;
  bgColor?: string;
  padding?: string;
  lineHeight?: number;
  fontSize?: string;
}
interface IInputText extends IInputTextEle {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  noResize?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLTextAreaElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const InputText = forwardRef< HTMLTextAreaElement, IInputText>((
  {
    value, 
    defaultValue, 
    noResize, 
    placeholder, 
    onClick, 
    onChange,
    onKeyPress,

    width, 
    height, 
    padding, 
    lineHeight, 
    shadow, 
    maxHeight, 
    bold, 
    bgColor, 
    fontSize }, externalRef ) => {

  // forwardRef로 넘겨준 externalRef 가 있으면, externalRef로 Ref값을 지정해준다. (focus 처리하기 위함.)
  const inputRef = externalRef ? externalRef as React.RefObject<HTMLTextAreaElement> : useRef<HTMLTextAreaElement>(null)

  
  // 크기 조절 이벤트
  const resize = (ref: React.RefObject<HTMLTextAreaElement>) => {
    if (!ref.current) return
    ref.current.style.height = "auto" ; // 줄어들때 먼저 설정
    ref.current.style.height = ref.current.scrollHeight +"px";
  }

  // value가 바뀔때 마다 실행됨
  useEffect(() => {
    if (noResize) return
    resize(inputRef)
  }, [value])
  
  
  return(
    <InputTextEle
      ref={inputRef}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onClick={onClick}
      onKeyPress={onKeyPress}

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
      fontSize={fontSize}
    />
  )
})

export default memo(InputText);


export const InputTextEle = styled.textarea<IInputTextEle>`  //["attrs"]
  width: ${({width}) => width ? width+"rem": "100%" };
  height: ${({height}) => height ? height+"rem": "auto" };
  max-height: ${({maxHeight}) => maxHeight ? maxHeight+"rem": "auto" };
  min-height: 1.75rem;

  font-weight: ${({bold}) => bold && "bold"};
  padding: ${({padding}) => padding && padding };
  line-height: ${({lineHeight}) => lineHeight ? lineHeight+"rem": "1.25rem" };
  background: ${({bgColor}) => bgColor && bgColor };

  ${fontSizeSet};

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

`

  