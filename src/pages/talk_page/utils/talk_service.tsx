import React from "react";
import { IMemo, ITag } from "../../../utils/interface/interface"
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { faClockFour } from "@fortawesome/free-regular-svg-icons";

export const setTalkTag = (tag: ITag) => {
  if (tag.id === "undefined") return <Icon icon={faHashtag} />
  else if (tag.id === "toBeDeleted") return <Icon icon={faClockFour} color="#FFFFFF" />
  else return tag.name.substring(0, 1)
}

export const getTagWithMemo = (tags: ITag[], editMemo: IMemo) => tags.filter(v => v.id === editMemo.tagId)[0]
  

// 태그 이름으로 태그 존재여부 검사
export const getTagWithTagName = (tags: ITag[], tagName: string) => { // 아예 삭제예정은 반환하지 않는다.
  if (tagName === "") return tags.filter(v => v.name === "undefined")[0]
  return tags.filter(v => v.name === tagName)[0]
}