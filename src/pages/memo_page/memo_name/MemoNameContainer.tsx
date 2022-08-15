import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useStore from "../../../store/useStore";

import { IMemo, ITag } from "../../../utils/interface/interface";
import { getTagWithTagName } from "../../talk_page/utils/talk_service";

// Memo Components
import { MemoProps } from "../MemoPage";
import EditMemoName from "./EditMemoName";
import MemoName from "./MemoName";


interface IMemoNameContainer extends MemoProps {
  tags: ITag[];
  editMemo: IMemo | null;
  memoList: IMemo[];
  isOpenMenu: boolean;
  isOpenEditTag: boolean;
  isOpenInputMemo: boolean;
  setIsOpenEditTag: (v: boolean) => void; 
  setIsOpenMenu: (v: boolean) => void; 
}


const MemoNameContainer = ( { 
  fbTag, 
  fbMemo, 
  tag, 
  tags, 
  memoList, 
  editMemo, 
  isOpenMenu, 
  isOpenEditTag,
  isOpenInputMemo,
  setIsOpenMenu, 
  setIsOpenEditTag, 
 }: IMemoNameContainer ) => {

  const { loading } = useStore()
  const [inputMemoName, setinputMemoName] = useState("");
  const navigate = useNavigate();

  // 태그네임 클릭: Menu Open
  const onClickTagName = () => {
    if (isOpenInputMemo || editMemo) return
    setIsOpenMenu(!isOpenMenu)
  }

  // 메모 네임 변경이벤트
  const onChangeMemoName = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setinputMemoName(e.target.value)
  }

  // 메모  태그네임 변경
  const onClickDoEditTag = (tag: ITag) => {
    setIsOpenEditTag(false);
    if (inputMemoName === tag.name) return;
    loading.start();

    const duplicateTag = getTagWithTagName(tags, inputMemoName); // 현재 talk page_service에서 받아옴. 나중에 구조 변경
    if (duplicateTag) {
      alert(`태그명 ${duplicateTag.name === "undefeined" ? "태그없음" : duplicateTag.name} 과 같은 태그가 발견되어 해당 태그로 병합됩니다.`)
      memoList.map( async memo => {
        await fbMemo.editMemoUsedTag(memo.id, duplicateTag.id) // 현재 메모의 태그 아이디를 수정해주고
        await fbTag.addUsedMemo(duplicateTag.id, memo.id)  // 존재하던 태그에 수정한 메모 id 넣어주고
      })
      fbTag.deleteTag(tag.id)
      navigate(`/grid`)
    } else {
      fbTag.editTagName(tag.id, inputMemoName)
    }
    
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
            onClickTagName={onClickTagName}
          />
        }
    </>
  )
}

export default MemoNameContainer;
