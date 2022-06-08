import React, { forwardRef } from "react";
import styled from "styled-components";
import { InputText } from "../../components/InputText";
import { IEditMemo } from "./MemoPage";


interface IMemoInputEdit {
  editMemo: IEditMemo;
  onClickDoEdit: () => void;
  inputMemo: string
  onChangeInputMemo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const MemoInputEdit = forwardRef<HTMLDivElement ,IMemoInputEdit>(( { editMemo, onClickDoEdit, inputMemo, onChangeInputMemo }, ref ) => {

  const stopPropagation = (e: React.MouseEvent<HTMLTextAreaElement>) => e.stopPropagation()


  return (
    <Outer
      onClick={onClickDoEdit}
    >
      <MemoInputEditBox
        x={editMemo.x}
        y={editMemo.y}
        width={editMemo.width}
        height={editMemo.height}
      >
        <InputText
          shadow
          padding=".5rem"
          lineHeight={1.125}
          value={inputMemo}
          onChange={onChangeInputMemo}
          onClick={(e) => stopPropagation(e)}
          width={editMemo.width/16}
          height={editMemo.height/16}
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
  width: ${({width}) => width && width+"px" };
  height: ${({height}) => height && height+"px" };
  transform: ${({width, height}) => height && `translate(-50%, 0)` };
  margin: 0;
  // outer가 없을시...
  /* transform: ${({width, height}) => height && `translate(-50%, -${68}px)` };  */
`

const Outer = styled.div`
  position: fixed;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .05);
  transform: translate(0, -76px);
`