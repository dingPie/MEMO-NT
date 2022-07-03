import React, { useEffect, useState } from "react";
import { FbAuth } from "../../../firebase/firebase_auth_service";
import useStore from "../../../store/useStore";

import { ITag } from "../../../utils/interface/interface";

// Memo Components
import { MemoProps } from "../MemoPage";
import EditMemoName from "./EditMemoName";
import MemoName from "./MemoName";

interface IMemoNameContainer extends MemoProps {
  isOpenMenu: boolean;
  isOpenEditTag: boolean;
  setIsOpenEditTag: (v: boolean) => void; 
  onClickTagName: () => void;
}

const MemoNameContainer = ( { fbTag, fbMemo, tag, isOpenMenu, isOpenEditTag, setIsOpenEditTag, onClickTagName }: IMemoNameContainer ) => {

  const { loading } = useStore()
  const [inputMemoName, setinputMemoName] = useState("");

  // 메모 네임 변경이벤트
  const onChangeMemoName = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setinputMemoName(e.target.value)
  }

  // 메모  태그네임 변경
  const onClickDoEditTag = (tag: ITag) => {
    loading.start();
    setIsOpenEditTag(false);
    if (inputMemoName === tag.name) return
    fbTag.editTagName(tag.id, inputMemoName)
    loading.finish();
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
