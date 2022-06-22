import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IconBox } from "../../../components/IconBox";

import Text from "../../../components/Text";
import { FbMemo } from "../../../firebase/firestore_memo_service";
import { FbTag } from "../../../firebase/firestore_tag_service";
import useStore from "../../../store/useStore";
import { ITag } from "../../../utils/interface/interface";
import { setTalkTag } from "../../talk_page/utils/talk_service";
import EditMemoName from "./EditMemoName";
import MemoName from "./MemoName";

interface IMemoNameContainer {
  fbTag: FbTag;
  fbMemo: FbMemo;
  tag: ITag;
  isOpenMenu: boolean;
  isOpenEditTag: boolean;
  setIsOpenEditTag: (v: boolean) => void; 
  onClickTagName: () => void;
}

const MemoNameContainer = ( { fbTag, fbMemo, tag, isOpenMenu, isOpenEditTag, setIsOpenEditTag, onClickTagName }: IMemoNameContainer ) => {

  const [inputMemoName, setinputMemoName] = useState("");

  // 메모 네임 변경이벤트
  const onChangeMemoName = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setinputMemoName(e.target.value)
  }

  // 메모 네임 변경 ()
  const onClickDoEditTag = () => {
    setIsOpenEditTag(false)
    if (inputMemoName === tag.name) return
    fbTag.editTagName(tag.id, inputMemoName)
  }

  useEffect(() => {
    setinputMemoName(tag.name)
  }, [isOpenEditTag])
  

  return(
    <>
        {isOpenEditTag ?
          <EditMemoName 
            tag={tag}
            inputMemoName={inputMemoName}
            onChangeMemoName={onChangeMemoName}
            onClickDoEditTag={onClickDoEditTag}
          /> :
          <MemoName 
            tag={tag}
            isOpenMenu={isOpenMenu}
            onClickTagName={onClickTagName}
          />
        }
    </>
  )
}

export default MemoNameContainer;
