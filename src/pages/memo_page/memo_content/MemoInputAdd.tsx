import React from "react";

import { CustomBtn } from "../../../components/Buttons";
import { ColBox, RowBox } from "../../../components/FlexBox";
import InputText from "../../../components/InputText";

import { ITag } from "../../../utils/interface/interface";

interface IMemoInputAdd {
  tag: ITag;
  inputMemo: string;
  onChangeInputMemo: (e: React.ChangeEvent<HTMLTextAreaElement> ) => void;
  onClickAddConfirm: (tagId: string, inputMemo: string) => void;
  onClickAddCancel: () => void;
}

const MemoInputAdd = ( { tag, inputMemo, onChangeInputMemo, onClickAddConfirm, onClickAddCancel }: IMemoInputAdd ) => {

  return(
    <ColBox padding="0 0 .5rem">
      <InputText
        shadow
        height={1.5}
        padding=".5rem"
        value={inputMemo}
        onChange={(e) => onChangeInputMemo(e)}
      />
      <RowBox center gap={.5} padding="0" >
        <CustomBtn
          size="s"
          width={15}
          bgColor="#F5F5F5"
          onClick={onClickAddCancel}
        >
          취소
        </CustomBtn>
        <CustomBtn
          size="s"
          width={15}
          bgColor="#dddddd"
          onClick={() => onClickAddConfirm(tag.id, inputMemo)}
        >
          확인
        </CustomBtn>
      </RowBox>
    </ColBox>
  )
}

export default MemoInputAdd;
