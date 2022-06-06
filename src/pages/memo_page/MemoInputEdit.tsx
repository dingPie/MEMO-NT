import React, { forwardRef } from "react";
import styled from "styled-components";
import { InputText } from "../../components/InputText";


interface IMemoInputEdit {

}

const MemoInputEdit = forwardRef<HTMLDivElement ,IMemoInputEdit>(( {}, ref ) => {


  return (
    <MemoInputEditBox>
      <InputText
        shadow
      />
    </MemoInputEditBox>
  )
})

export default MemoInputEdit;

const MemoInputEditBox = styled.div`
  position: absolute;
  margin:0;
  padding:0;
`