import React from "react";
import styled from "styled-components";

import { RowBox } from "../../../components/FlexBox";
import { IconBox } from "../../../components/IconBox";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrashCan,
  faPalette,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { ITag } from "../../../utils/interface/interface";
import { slideUp } from "../../../styles/stylesCss";
import { MenuBox } from "./MemoMenuContainer";

interface IMemoMenu {
  tag: ITag;
  onClickEditBtn?: () => void;
  onClickDeleteBtn?: () => void;
  onClickPaletteBtn?: () => void;
  onClickCloseMenuBtn?: () => void;
}

const MemoMenu = ({
  tag,
  onClickEditBtn,
  onClickDeleteBtn,
  onClickPaletteBtn,
  onClickCloseMenuBtn,
}: IMemoMenu) => {
  return (
    <MenuBox>
      <RowBox gap={0.5} padding=".25rem">
        {tag.id !== "undefined" && tag.id !== "toBeDeleted" && (
          <IconBox fontSize="l" onClick={onClickEditBtn}>
            <Icon icon={faPen} />
          </IconBox>
        )}
        <IconBox onClick={onClickDeleteBtn}>
          <Icon icon={faTrashCan} />
        </IconBox>
        {tag.id !== "undefined" && tag.id !== "toBeDeleted" && (
          <IconBox fontSize="l" onClick={onClickPaletteBtn}>
            <Icon icon={faPalette} />
          </IconBox>
        )}
      </RowBox>

      <IconBox fontSize="l" onClick={onClickCloseMenuBtn}>
        <Icon icon={faXmark} />
      </IconBox>
    </MenuBox>
  );
};

export default MemoMenu;
