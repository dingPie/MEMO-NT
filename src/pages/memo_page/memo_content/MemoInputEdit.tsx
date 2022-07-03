import React, { forwardRef } from "react";
import styled from "styled-components";

import InputText from "../../../components/InputText";
import { IconBox } from "../../../components/IconBox";
import { RowBox } from "../../../components/FlexBox";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { IEditMemo } from "./../MemoPage";


interface IMemoInputEdit {
  editMemo: IEditMemo;
  inputMemo: string
  onChangeInputMemo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClickDoEditMemo: (editMemo: IEditMemo, inputMemo: string) => void;
  onClickDoDeleteMemo: (e: React.MouseEvent<HTMLDivElement>, editMemo: IEditMemo) => void;
}


const MemoInputEdit = forwardRef<HTMLDivElement ,IMemoInputEdit>(( { editMemo, onClickDoEditMemo, inputMemo, onChangeInputMemo, onClickDoDeleteMemo }, ref ) => {

  const stopPropagation = (e: React.MouseEvent<HTMLTextAreaElement>) => e.stopPropagation()


  return (
    <Outer
      onClick={ () => onClickDoEditMemo(editMemo, inputMemo)}
    >
      <MemoInputEditBox
        x={editMemo.x}
        y={editMemo.y}
        width={editMemo.width}
        height={editMemo.height}
      >
        <RowBox padding=".125rem .5rem" right>
          <IconBox
            onClick={(e) => onClickDoDeleteMemo(e, editMemo)}
          >
            <Icon icon={faTrashCan} />
          </IconBox>
        </RowBox>
        <InputText
          shadow
          padding=".5rem"
          lineHeight={1.125}
          value={inputMemo}
          width={editMemo.width/16}
          height={editMemo.height/16}
          onChange={onChangeInputMemo}
          onClick={(e) => stopPropagation(e)}
        />
      </MemoInputEditBox>
    </Outer>
  )
})
export default MemoInputEdit;

interface ITest  {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}


const MemoInputEditBox = styled.div<ITest>`
  position: absolute;
  top: ${({y}) => y && y+"px" };
  left: 50%;
  margin: 0;

  width: ${({width}) => width && width+"px" };
  height: ${({height}) => height && height+"px" };
  transform: ${({width, height}) => height && `translate(-50%, 0)` };

  // outer가 없을시...
  /* transform: ${({width, height}) => height && `translate(-50%, -${68}px)` };  */
`

const Outer = styled.div`
  position: fixed;
  left: 0;
  width: 100vw;
  height: 105vh;
  background: rgba(0, 0, 0, .03);
  transform: translate(0, -108px); // -76px
`