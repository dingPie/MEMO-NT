import React, { useEffect, useRef, useState } from "react";
import { IMemo, ITag } from "../../../utils/interface/interface";
import TalkInput from "./TalkInput";
import { TalkProps } from "../TalkPage";
import TalkEditInput from "./TalkEditInput";
import TalkInputOption from "./TalkInputOption";
import { FbMemo } from "../../../firebase/firestore_memo_service";
import { FbTag } from "../../../firebase/firestore_tag_service";
 
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHashtag } from "@fortawesome/free-solid-svg-icons";


interface ITalkInpuContainer extends TalkProps {
  fbMemo: FbMemo;
  fbTag: FbTag;
  setEditMemo: (v: IMemo | null) => void;
  editMemo: IMemo | null;
}

const TalkInpuContainer = ( { fbMemo, fbTag, tags, editMemo, setEditMemo }: ITalkInpuContainer ) => {

  const [inputMemo, setInputMemo] = useState<string>('') // 입력중인 memo
  const inputBoxRef = useRef<HTMLDivElement>(null)
  const [bottomSpace, setBottomSpace] = useState(0); // option창 bottom 좌표 설정
  const [editTagName, setEditTagName] = useState('')
  const [recommTag, setRecommTag] = useState<ITag>()

  useEffect(() => {
    if (editMemo) setInputMemo(editMemo.content)
  }, [editMemo])
  
  // input memo가 바뀔때마다 실행되는 로직 -> input창 크기감지 / 추천 검색어 표시
  const onChangeInputMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value
    
    // 태그 추천 로직
    if (value.includes("#")) {
      const content = value.slice(0, value.indexOf("#"))
      const tag = value.slice(value.indexOf("#")+1, value.length)
      if (tag !== "") {
        const recommandTag = tags.filter(v=> v.name.includes(tag))[0]
        setRecommTag(recommandTag)
      }
    }

    if (inputBoxRef.current) setBottomSpace( inputBoxRef.current.clientHeight )
    setInputMemo(value)
  }

  // editmemo 취소
  const onClickCancelEditMemo = () => {
    setEditMemo(null)
    setInputMemo("")
  }

  // 수정할 태그 변경
  const onChangeTagName = (e?: React.ChangeEvent<HTMLTextAreaElement> | null, tagName?: string) => {
    if (e) setEditTagName(e.target.value)
    else if (tagName) setEditTagName(tagName)
  }

  const getTagWithMemo = (editMemo: IMemo) => {
    return tags.filter(v => v.id === editMemo.tagId)[0]
  }
  const getTagWithTagName = (tagName: string) => {
    if (tagName === "") return tags.filter(v => v.id === "undefined")[0]
    return tags.filter(v => v.name === tagName)[0]
  }

  // 태그 추가 or 수정
  const onClickInputBtn = async () => {
    if (!inputMemo) return
    
    // 메모 수정시
    if (editMemo) { 
      const tag = getTagWithMemo(editMemo) // 현재 메모의 태그 반환
      // 메모수정시, 태그수정
      if (tag.name !== editTagName) {
        const editedTag = getTagWithTagName(editTagName); // 이름이 같은 태그가 존재하는지 검사
        if (!editedTag) { // 존재하지 않으면
          const tagId = await fbTag.addTag(editTagName); //태그 생성 
          fbTag.addUsedMemo(tagId!, editMemo.id)  // 생성한 태그에 수정한 메모 id 넣어주고
        } 
        else { // 존재하면
          fbTag.addUsedMemo(editedTag.id!, editMemo.id)  // 존재하던 태그에 수정한 메모 id 넣어주고
        }
        fbTag.deleteUsedMemo(editMemo) // 현재 태그에서 editMemo에서 현재 메모 아이디 빼주고  
      }
      // 메모수정시, 메모수정
      if (editMemo.content !== inputMemo) {
        console.log("메모 수정로직")
        await fbMemo.editMemoContent(editMemo.id, inputMemo)
      }
      setEditMemo(null)
    } 

    // 메모 추가시 
    else {
      let content = "";
      let tagName = "";
      if (inputMemo.includes("#")) {
        content = inputMemo.slice(0, inputMemo.indexOf("#"))
        tagName = inputMemo.slice(inputMemo.indexOf("#")+1, inputMemo.length)
      } else {
        content = inputMemo.slice(0, inputMemo.length-1)
        tagName = "삭제 예정"
      }
      if (tagName === "") tagName = "태그 없음"


      let 태그검사 = tags.filter(v => v.name === tagName)[0]; // 이름이 같은 태그가 존재하는지 검사

      console.log("태그검사", 태그검사)
      if (태그검사) { // 태그가 있으면
        const newMemo = await fbMemo.addMemo(태그검사.id, inputMemo)
        fbTag.addUsedMemo("undefined", newMemo!.id)
      } else { // 태그가 없으면
        const newTagId = await fbTag.addTag(tagName); //태그 생성
        const newMemo = await fbMemo.addMemo(newTagId!, content)
        fbTag.addUsedMemo(newTagId!, newMemo!.id)  // 생성한 태그에 수정한 메모 id 넣어주고
      }


    }

    // state도 바꿔줘야한다......
    // state를 바꾸지 않아서 새로고침해야됨
    setInputMemo("") // 이건 둘 다 실행되어야 함.
  }

  // 태그 옵션버튼 클릭 => 태그 input창에 바로 추가
  const onClickTagOption = (tagName?: string) => {
    let result;
    if (inputMemo.includes("#")) result = inputMemo.split('#')[0] + "#" + tagName
    else result = inputMemo + " #" + tagName
    
    setInputMemo(result)
    // inputText도 focus 하고싶은데, 하위에 어려개 ref를 어떻게 설정하는지 몰라서 잠시 멈춤.
    // 또한, TextArea는 Resize때문에 Ref 또한 적용되어 있어서...애매함.
  }

  return (
    <>
      {/* 태그 추천관련 */}
      { inputMemo && !editMemo &&
        <TalkInputOption
          tags={tags}
          bottomSpace={bottomSpace}
          recommTag={recommTag}
          onClickTagOption={onClickTagOption}
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
      {/*  기본 인풋창  */}
      <TalkInput
        ref={inputBoxRef}
        value={inputMemo}
        onChangeInputMemo={(e) => onChangeInputMemo(e)}
        onClickInputBtn={onClickInputBtn}
      />
    </>
  )
}

export default TalkInpuContainer;