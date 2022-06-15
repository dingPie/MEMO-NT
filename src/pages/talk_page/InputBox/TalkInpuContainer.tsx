import React, { useRef, useState } from "react";
import { IMemo } from "../../../utils/interface/interface";
import TalkInput from "../TalkInput";
import { TalkProps } from "../TalkPage";
import TalkEditInput from "./TalkEditInput";
import TalkInputOption from "./TalkInputOption";

interface ITalkInpuContainer extends TalkProps {
  inputMemo: string;
  setInputMemo: (v: string) => void;
  setEditMemo: (v: IMemo | null) => void;
  editMemo: IMemo | null;
}

const TalkInpuContainer = ( { tags, inputMemo, editMemo, setInputMemo, setEditMemo  }: ITalkInpuContainer ) => {

  const inputRef = useRef<HTMLDivElement>(null)
  const [bottomSpace, setBottomSpace] = useState(0); // option창 bottom 좌표 설정
  const [editTagName, setEditTagName] = useState('')

  const onChangeInputMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMemo(e.target.value)
    if (inputRef.current) setBottomSpace( inputRef.current.clientHeight )
    // option 추천하는 로직
  }

  const onClickCancelEditMemo = () => {
    setEditMemo(null)
    setInputMemo("")
  }

  const onChangeTagName = (e?: React.ChangeEvent<HTMLTextAreaElement> | null, tagName?: string) => {
    if (e) setEditTagName(e.target.value)
    else if (tagName) setEditTagName(tagName)
  }

  return (
    <>
      {/* 태그 추천관련 */}
      { inputMemo && !editMemo &&
        <TalkInputOption
          tags={tags}
          bottomSpace={bottomSpace}
        />
      }
      {/* 메모 수정시 나오는.. */}
      { editMemo &&
        <TalkEditInput
          tags={tags}
          bottomSpace={bottomSpace}
          editMemo={editMemo}
          onClickCancelEditMemo={onClickCancelEditMemo}
          editTagName={editTagName}
          onChangeTagName={onChangeTagName}
        />
      }

      <TalkInput
        ref={inputRef}
        value={inputMemo}
        onChangeInputMemo={(e) => onChangeInputMemo(e)}
      />
    </>
  )
}

export default TalkInpuContainer;