import React from "react";
import styled from "styled-components";

import { RowBox } from "../../../components/FlexBox";
import { IconBox } from "../../../components/IconBox";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrashCan,
  faThumbTack,
  faAlignLeft,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { slideUp } from "../../../styles/stylesCss";
import { IMemo } from "../../../utils/interface/interface";

interface ITalkMenu {
  selectedMemo: IMemo;
  onClickEditBtn: () => void;
  onClickDeleteBtn: () => void;
  onClickPinnBtn: () => void;
  onClicGoMemoBtn: () => void;
  onClickCloseMenuBtn: () => void;
}

const TalkMemu = ({
  selectedMemo,
  onClickEditBtn,
  onClickDeleteBtn,
  onClickPinnBtn,
  onClicGoMemoBtn,
  onClickCloseMenuBtn,
}: ITalkMenu) => {
  return (
    <MenuBox>
      <RowBox gap={0.5} padding=".25rem">
        <IconBox onClick={onClickEditBtn}>
          <Icon icon={faPen} />
        </IconBox>

        <IconBox onClick={onClickDeleteBtn}>
          <Icon icon={faTrashCan} />
        </IconBox>

        {selectedMemo.tagId !== "toBeDeleted" && (
          <IconBox onClick={onClickPinnBtn}>
            <Icon icon={faThumbTack} />
          </IconBox>
        )}

        <IconBox onClick={onClicGoMemoBtn}>
          <Icon icon={faAlignLeft} />
        </IconBox>
      </RowBox>

      <IconBox onClick={onClickCloseMenuBtn}>
        <Icon icon={faXmark} />
      </IconBox>
    </MenuBox>
  );
};

export default TalkMemu;

export const MenuBox = styled(RowBox)`
  align-items: center;
  padding: 0.25rem;
  background: white;
  // transition 적용 여부때문에 일단 보류

  animation: ${slideUp} 0.2s;
`;
