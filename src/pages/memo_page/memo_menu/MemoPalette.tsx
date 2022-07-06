import React from "react";
import styled, { css } from "styled-components";
import useStore from "../../../store/useStore";

import { IconBox } from "../../../components/IconBox";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { ITag } from "../../../utils/interface/interface";
import { slideUp } from "../../../styles/stylesCss";


interface IMemoPalette {
  tag: ITag;
  seletedColor: number;
  onClickDoEditPalette: (tag: ITag) => void;
  onClickSelectColor: (colorId: number) => void;
}

const MemoPalette = ( { tag, seletedColor, onClickDoEditPalette, onClickSelectColor }: IMemoPalette ) => {

  const { palette } = useStore();


  return (
    <PaletteMenuBox>
      <IconBox
        width={2.5} 
        height={1.25}
        inline
        onClick={ () => onClickDoEditPalette(tag) }
        fontSize='l'
      >
        <Icon size='lg' icon={faCheck} />
      </IconBox>
      { Object.values(palette.palette).slice(2, Object.values(palette.palette).length )
          .map( color => { return (
            <PaletteBox
              onClick={() => onClickSelectColor(color.id)}
              bgColor={color.code}
              selectedColor={seletedColor === color.id ? true : false}
            />
          )})}
    </PaletteMenuBox>
  )
}

export default MemoPalette;

const PaletteMenuBox = styled.div`
  padding: .5rem .5rem 0;
  background: white;
  overflow-x: scroll ;
  width: 100%;
  height: 3rem;
  white-space: nowrap;

  &::-webkit-scrollbar {
    height: .5rem;
  }

  &::-webkit-scrollbar-thumb {
  background-color: #d3d3d3;
  border-radius: .25rem;
  background-clip: padding-box;
  border: 2px solid transparent;
}

animation: ${slideUp} .2s;
`

const PaletteBox = styled.span<{bgColor: string, selectedColor?: boolean}>`
  display: inline-block;
  width: 2.5rem;
  height: 1.25rem;
  background: ${ ({bgColor}) => bgColor && bgColor};
  margin: 0 .375rem;

  ${ ({selectedColor}) => 
      selectedColor && 
      css`
        transform: scale(1.1);
        box-sizing: border-box;
        border: 2px solid gray;
        border-radius: 2px;
    `};
`