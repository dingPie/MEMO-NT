import React from "react";
import styled from "styled-components";

import { RowBox } from "../../../components/FlexBox";
import { IconBox } from "../../../components/IconBox";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan, faPalette, faXmark } from "@fortawesome/free-solid-svg-icons";

import { ITag } from "../../../utils/interface/interface";


interface IMemoMenu {
  tag: ITag;
  onClickEditBtn?: () => void;
  onClickDeleteBtn?: () => void;
  onClickPaletteBtn?: () => void;
  onClickCloseMenuBtn?: () => void;
}


const MemoMenu = ( { tag, onClickEditBtn, onClickDeleteBtn, onClickPaletteBtn, onClickCloseMenuBtn }: IMemoMenu ) => {

  
  return(
    <MenuBox>

      <RowBox gap={.5} padding=".25rem">
        {(tag.id !== "undefined" && tag.id !== "toBeDeleted") &&
          <IconBox
            onClick={onClickEditBtn}
          >
            <Icon icon={faPen} />
          </IconBox>
        }
        <IconBox
          onClick={onClickDeleteBtn}
        >
          <Icon icon={faTrashCan} />
        </IconBox>
        {(tag.id !== "undefined" && tag.id !== "toBeDeleted") &&
          <IconBox
            onClick={onClickPaletteBtn}
          >
            <Icon icon={faPalette} />
          </IconBox>
        }
      </RowBox>

      <IconBox
        onClick={onClickCloseMenuBtn}
      >
        <Icon icon={faXmark} />
      </IconBox>

    </MenuBox>
  )
}

export default MemoMenu;

// 나중에 Buttom 부분 빼서 동기화

export const MenuBox = styled(RowBox)`
  display: flex;
  position: fixed;
  align-items: center;
  bottom: 0; // input Box 크기
  left: 50%;
  transform: translate(-50%, 0);
  
  padding: .25rem;
  max-width: 30rem;
  background: white;
`