import React from "react";
import styled from "styled-components";
import { RowBox } from "../../../components/FlexBox";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan, faThumbTack, faAlignLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { IconBox } from "../../../components/IconBox";
import { slideUp } from "../../../styles/stylesCss";


interface ITalkMenu {
  onClickEditBtn: () => void;
  onClickDeleteBtn: () => void;
  onClickPinnBtn: () => void;
  onClicGoMemoBtn: () => void;
  onClickCloseMenuBtn: () => void;
}


const TalkMemu = ( { onClickEditBtn, onClickDeleteBtn, onClickPinnBtn, onClicGoMemoBtn, onClickCloseMenuBtn }: ITalkMenu ) => {

  return(
    <MenuBox
      // align="center"
      // padding=".25rem .5rem"
      // bgColor="white"
    >
      <RowBox gap={.5} padding=".25rem">
        <IconBox
          onClick={onClickEditBtn}
        >
          <Icon icon={faPen} />
        </IconBox>
        
        <IconBox
          onClick={onClickDeleteBtn}
        >
          <Icon icon={faTrashCan} />
        </IconBox>

        <IconBox
          onClick={onClickPinnBtn}
        >
          <Icon icon={faThumbTack} />
        </IconBox>

        <IconBox
          onClick={onClicGoMemoBtn}
        >
          <Icon icon={faAlignLeft} />
        </IconBox>
      </RowBox>

      <IconBox
        onClick={onClickCloseMenuBtn}
      >
        <Icon icon={faXmark} />
      </IconBox>
    </MenuBox>
  )
}

export default TalkMemu;

export const MenuBox = styled(RowBox)`
  align-items: center;
  padding: .25rem;
  background: white;
  // transition 적용 여부때문에 일단 보류

  animation:  ${slideUp} .2s;
`