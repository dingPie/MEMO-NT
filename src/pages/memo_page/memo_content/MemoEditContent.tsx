import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import InputText from "../../../components/InputText";
import { IconBox } from "../../../components/IconBox";
import { RowBox } from "../../../components/FlexBox";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import { IMemo } from "../../../utils/interface/interface";


interface IMemoEditContent {
  editMemo: IMemo | null;
  inputMemo: string;
  onChangeInputMemo: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClickDoEditMemo: (editMemo: IMemo, inputMemo: string) => Promise<void>;
  onClickDoDeleteMemo: (e: React.MouseEvent<HTMLDivElement>, editMemo: IMemo) => Promise<void>;
  onEnterInputEvent: (e: React.KeyboardEvent<HTMLTextAreaElement>, editMemo: IMemo, inputMemo: string) => Promise<void>;
}


const MemoEditContent = ( { editMemo, inputMemo, onClickDoEditMemo, onChangeInputMemo, onClickDoDeleteMemo, onEnterInputEvent }: IMemoEditContent ) => {


  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [])

  return (
      <EditBox>
        <InputText
          ref={inputRef}
          shadow
          padding=".5rem"
          lineHeight={1.125}
          value={inputMemo}
          onChange={onChangeInputMemo}
          onKeyPress={(e) => onEnterInputEvent(e, editMemo!, inputMemo)}
        />
        <RowBox 
          right
          padding=" .25rem .5rem .5rem" 
          gap={.5} 
        >
          <IconBox
            shadow
            fontSize="l"
            onClick={(e) => onClickDoDeleteMemo(e, editMemo!)}
          >
            <Icon icon={faTrashCan} />
          </IconBox>
          <IconBox
            shadow
            fontSize="l"
            onClick={ () => onClickDoEditMemo(editMemo!, inputMemo)}
          >
            <Icon icon={faCheckCircle} />
          </IconBox>
        </RowBox>
      </EditBox>
  )
}
export default MemoEditContent;

const EditBox = styled.div`
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
`