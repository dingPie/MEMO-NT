import React from "react";
import styled, { css } from "styled-components";
import { RowBox } from "../../../components/FlexBox";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { IconBox } from "../../../components/IconBox";
import { colors } from "../../../utils/data/dummyData";
import { ITag } from "../../../utils/interface/interface";
import useStore from "../../../store/useStore";
import { toJS } from "mobx";

interface IMemoPalette {
  tag: ITag;
  seletedColor: number;
  onClickDoEditPalette: (tag: ITag) => void;
  onClickSelectColor: (colorId: number) => void;
}

const MemoPalette = ( { tag, seletedColor, onClickDoEditPalette, onClickSelectColor }: IMemoPalette ) => {

  const { palette } = useStore();


  return (
    <MenuBox>
      <IconBox
        inline
        onClick={ () => onClickDoEditPalette(tag) }
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
    </MenuBox>
  )
}

export default MemoPalette;

export const MenuBox = styled.div`
  position: fixed;
  bottom: 0; // input Box 크기
  left: 50%;
  transform: translate(-50%, 0);

  padding: .5rem .5rem 0 ;
  max-width: 30rem;
  background: white;
  overflow-x: scroll ;
  width: 100%;
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
`

const PaletteBox = styled.span<{bgColor: string, selectedColor?: boolean}>`
  display: inline-block;
  width: 2.5rem;
  height: 1.25rem;
  background: ${ ({bgColor}) => bgColor && bgColor};
  margin: 0 .375rem;
  vertical-align: middle;

  ${ ({selectedColor}) => 
      selectedColor && 
      css`
        transform: scale(1.1);
        box-sizing: border-box;
        border: 2px solid gray;
        border-radius: 2px;
    `};
`