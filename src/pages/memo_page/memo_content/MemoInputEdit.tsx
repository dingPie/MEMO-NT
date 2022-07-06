import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import InputText from "../../../components/InputText";
import { IconBox } from "../../../components/IconBox";
import { RowBox } from "../../../components/FlexBox";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import { IEditMemo } from "../MemoPage";
import { IMemo } from "../../../utils/interface/interface";


interface IMemoInputEdit {
  editMemo: IMemo | null;
  inputMemo: string;
  onChangeInputMemo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClickDoEditMemo: (editMemo: IMemo, inputMemo: string) => Promise<void>;
  onClickDoDeleteMemo: (e: React.MouseEvent<HTMLDivElement>, editMemo: IMemo) => Promise<void>;
}


const MemoInputEdit = ( {editMemo, inputMemo, onClickDoEditMemo, onChangeInputMemo, onClickDoDeleteMemo }: IMemoInputEdit ) => {


  const inputRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [])

  return (
      <>
        <InputText
          ref={inputRef}
          shadow
          padding=".5rem"
          lineHeight={1.125}
          value={inputMemo}
          onChange={onChangeInputMemo}
        />
        <RowBox 
          right
          padding=".125rem .5rem" 
          gap={.25} 
        >
          <IconBox
            fontSize="l"
            onClick={(e) => onClickDoDeleteMemo(e, editMemo!)}
          >
            <Icon icon={faTrashCan} />
          </IconBox>
          <IconBox
            fontSize="l"
            onClick={ () => onClickDoEditMemo(editMemo!, inputMemo)}
          >
            <Icon icon={faCheckCircle} />
          </IconBox>
        </RowBox>
      </>
  )
}
export default MemoInputEdit;