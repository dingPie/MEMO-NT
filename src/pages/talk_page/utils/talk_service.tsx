import React from "react";
import { IMemo, ITag } from "../../../utils/interface/interface"
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { faClockFour } from "@fortawesome/free-regular-svg-icons";

// 태그 이름 설정 (확장시, 비확장시)
export const setTalkTag = (tag: ITag, expand?: "expand") => {
  if (tag.id === "undefined") return <Icon icon={faHashtag} />
  else if (tag.id === "toBeDeleted") return <Icon icon={faClockFour} color="#FFFFFF" />

  if (expand) return tag.name
  else return tag.name.substring(0, 1)
}

// 메모로 메모태그찾기
export const getTagWithMemo = (tags: ITag[], editMemo: IMemo) => tags.filter(v => v.id === editMemo.tagId)[0]
  
// 태그 이름으로 태그 존재여부 검사
export const getTagWithTagName = (tags: ITag[], tagName: string) => { // 아예 삭제예정은 반환하지 않는다.
  if (tagName === "") return tags.filter(v => v.name === "undefined")[0]
  return tags.filter(v => v.name === tagName)[0]
}

// 마지막 메모로 (현재 메모의 마지막 길이로 scroll)
export const focusLastMemo = (talkBoxRef: React.RefObject<HTMLDivElement>) => {
  if (!talkBoxRef.current) return
  const scrollHeight = talkBoxRef.current.scrollHeight
  talkBoxRef.current!.scroll(({ top: scrollHeight, left: 0, behavior: "smooth" }))
}