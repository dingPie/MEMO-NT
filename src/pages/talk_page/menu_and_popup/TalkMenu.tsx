import React from "react";
import styled from "styled-components";
import { RowBox } from "../../../components/FlexBox";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan, faThumbTack, faExpand, faAlignLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import { IconBox } from "../../../components/IconBox";


interface ITalkMenu {
  onClickEditBtn: () => void;
  onClickDeleteBtn: () => void;
  onClickPinnBtn: () => void;
  onClickExpandBtn: () => void;
  onClicGoMemoBtn: () => void;
  onClickCloseMenuBtn: () => void;
}


const TalkMemu = ( { onClickEditBtn, onClickDeleteBtn, onClickPinnBtn, onClickExpandBtn, onClicGoMemoBtn, onClickCloseMenuBtn }: ITalkMenu ) => {

  return(
    <MenuBox>

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

        {/* <IconBox
          onClick={onClickExpandBtn}
        >
          <Icon icon={faExpand} />
        </IconBox> */}

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
  display: flex;
  position: fixed;
  align-items: center;
  bottom: 4rem; // input Box 크기
  left: 50%;
  transform: translate(-50%, 0);
  
  padding: .25rem;
  max-width: 30rem;
  background: white;
`