import React from "react";
import { CustomBtn } from "../../components/Buttons";
import { RowBox } from "../../components/FlexBox";
import { InputText } from "../../components/InputText";

interface IMemoInput {
  inputMemo: string;
  onChangeInputMemo: (e: React.ChangeEvent<HTMLInputElement> ) => void;
  onClickAddConfirm: () => void;
  onClickAddCancel: () => void;
}

const MemoInput = ( { inputMemo, onChangeInputMemo, onClickAddConfirm, onClickAddCancel }: IMemoInput ) => {

  return(
    <>
      <InputText
          shadow
        />
      <RowBox center gap={.5} padding="0" >
        <CustomBtn
          size="s"
          width={15}
          bgColor="#F5F5F5"
          onClick={onClickAddConfirm}
        >
          취소
        </CustomBtn>
        <CustomBtn
          size="s"
          width={15}
          bgColor="#dddddd"
          onClick={onClickAddCancel}
        >
          확인
        </CustomBtn>
      </RowBox>
    </>
  )
}

export default MemoInput;
