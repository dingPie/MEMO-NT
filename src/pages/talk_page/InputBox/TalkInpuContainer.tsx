import React, { useEffect, useRef, useState } from "react";
import { IMemo, ITag } from "../../../utils/interface/interface";
import TalkInput from "./TalkInput";
import { TalkProps } from "../TalkPage";
import TalkEditTagName from "./TalkEditTagName";
import TalkInputOption from "./TalkInputOption";
import { FbMemo } from "../../../firebase/firestore_memo_service";
import { FbTag } from "../../../firebase/firestore_tag_service";
 
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHashtag, faTag } from "@fortawesome/free-solid-svg-icons";
import { getTagWithMemo, getTagWithTagName } from "../utils/talk_service";


interface ITalkInpuContainer extends TalkProps {
  fbMemo: FbMemo;
  fbTag: FbTag;
  editMemo: IMemo | null;
  setEditMemo: (v: IMemo | null) => void;
  viewMemo: IMemo[];
  setViewMemo: (v: IMemo[]) => void;
}

const TalkInpuContainer = ( { fbMemo, fbTag, tags, editMemo, setEditMemo, viewMemo, setViewMemo }: ITalkInpuContainer ) => {

  const inputBoxRef = useRef<HTMLDivElement>(null)
  const [inputMemo, setInputMemo] = useState<string>('') // 입력중인 memo
  const [bottomSpace, setBottomSpace] = useState(0); // option창 bottom 좌표 설정
  const [editTagName, setEditTagName] = useState('')
  const [recommTag, setRecommTag] = useState<ITag>()

  // editmemo 설정시 tagName , content input state 설정
  useEffect(() => {
    if (!editMemo) return
    setInputMemo(editMemo.content)
    const tagName = editMemo.tagId === "undefined" ? "" : getTagWithMemo(tags, editMemo).name
    onChangeTagName(null, tagName)
  }, [editMemo])
  

  // editmemo 취소
  const onClickCancelEditMemo = () => {
    setEditMemo(null)
    setInputMemo("")
  }

  // 수정할 tagName state 관리
  const onChangeTagName = (e?: React.ChangeEvent<HTMLTextAreaElement> | null, tagName?: string) => {
    if (e) setEditTagName(e.target.value)
    else if (tagName) setEditTagName(tagName)
  }


  /*
    input memo가 바뀔때마다 실행되는 로직 -> input창 크기감지 / 추천 검색어 표시
  */ 
  const onChangeInputMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 태그 추천 로직
    let { value } = e.target
    const tagName = value.split("#")[1];
    if (tagName) {
      const recommandTag = tags.filter(v=> v.name.includes(tagName))
       // firebase 자동 sort .sort((a, b) => b.lastUpdate - a.lastUpdate )
      console.log("추천태그", recommandTag)
      setRecommTag(recommandTag[0])
    }

    // input 사이즈에 따른 option 좌표 변경로직
    if (inputBoxRef.current) setBottomSpace( inputBoxRef.current.clientHeight )
    setInputMemo(value)
  }


  /*
    태그 input 버튼 클릭 => editMemo 유무에 따라 edit or add 로직 발생
  */ 
  const onClickInputBtn = async () => {
    if (!inputMemo) return
    // 메모 수정
    if (editMemo) {
      const newTag = await onClickEditTag(editMemo) // 태그 데이터 수정 (수정할 메모와 관련된 태그데이터 수정)
      onClickEditMemo(editMemo, inputMemo) // 메모 데이터 수정

      const editedMemo: IMemo = {  // 메모(태그) state 수정
        ...editMemo,
        tagId: newTag.id,
        content: inputMemo
      }
      const newArr = viewMemo.map(v => v.id === editMemo.id ? editedMemo : v)
      setViewMemo(newArr)
      setEditMemo(null)
    } 
    // 메모 추가
    else { 
      const newMemo = await onClickAddMemo(inputMemo) as IMemo ; // 메모 데이터 추가
      setViewMemo([...viewMemo, newMemo]) // 메모 state 추가
    }
    setInputMemo("") // 이건 둘 다 실행되어야 함.
  }

  // 메모 수정시 태그 수정 
  const onClickEditTag = async (editMemo: IMemo) => {
    const targetTag = getTagWithMemo(tags, editMemo) // 현재 메모의 태그 정보
    if (targetTag.name === editTagName) return targetTag // 태그이름이 수정되지 않았으면 리턴

    let newTag = getTagWithTagName(tags, editTagName); // 이름이 같은 태그가 존재하는지 검사
    if (!newTag) newTag = await fbTag.addTag(editTagName) as ITag; // 현재 태그가 태그목록에서 없으면 새 태그 생성 
    
    await fbMemo.editMemoUsedTag(editMemo.id, newTag.id) // 현재 메모의 태그 아이디를 수정해주고
    await fbTag.addUsedMemo(newTag.id, editMemo.id)  // 존재하던 태그에 수정한 메모 id 넣어주고
    await fbTag.deleteUsedMemo(editMemo) // 현재 태그에서 editMemo에서 현재 메모 아이디 빼주고
    return newTag; // 새 태그 반환
    // if (getTagWithMemo(editMemo).usedMemo.length === 0 ) {
    //   await fbTag.deleteTag(editMemo.tagId)
    // 반태그 삭제 => deletedUsedMemo 를 사용했을때 시점이 맞지 않아서 안 됨.
    // 태그 변화가 감지되었을 때, (useEffect, 빈 태그를 삭제해주는 로직은 어떨까?)
    // } 
  }

  // 메모 수정시 메모 수정
  const onClickEditMemo = async (editMemo: IMemo, inputMemo: string) => {
    if (editMemo.content === inputMemo) return
    fbMemo.editMemoContent(editMemo.id, inputMemo)
  }

  // 메모 추가시
  const onClickAddMemo = async (inputMemo: string) => {
    const target = inputMemo.split("#")
    let content = target[0]
    let tagName = target[1]
    if (tagName === "") tagName = "undefined"
    else if (tagName === undefined) tagName = "toBeDeleted"

    let newTag = getTagWithTagName(tags, tagName);
    if (!newTag) newTag = await fbTag.addTag(tagName) as ITag; // 현재 태그가 태그목록에서 없으면 새 태그 생성
    
    const newMemo = await fbMemo.addMemo(newTag.id, content) // 메모 추가하고
    fbTag.addUsedMemo(newTag.id, newMemo!.id) // 사용한 태그에 현재 메모 로그를 추가해준다.
    return newMemo 
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
        <TalkEditTagName
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