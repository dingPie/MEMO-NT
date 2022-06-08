import React from "react";
import styled from "styled-components";
import { RowBox } from "../../components/FlexBox";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { IconBox } from "../../components/IconBox";
import { colors } from "../../utils/data/dummyData";

interface IMemoPalette {
  onClickDoEditPalette: () => void;
}

const MemoPalette = ( { onClickDoEditPalette }: IMemoPalette ) => {

  return (
    <MenuBox>
      <IconBox
        inline
        onClick={onClickDoEditPalette}
      >
        <Icon size='lg' icon={faCheck} />
      </IconBox>
      { colors.map( v => {
        return <PaletteBox
        onClick={() => console.log("색상변경 이벤트")}
         bgColor={v.code} 
         /> 
      })

      }
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

const PaletteBox = styled.span<{bgColor: string}>`
  display: inline-block;
  width: 2.5rem;
  height: 1.25rem;
  background: ${ ({bgColor}) => bgColor && bgColor};
  margin: 0 .375rem;
  vertical-align: middle;
`