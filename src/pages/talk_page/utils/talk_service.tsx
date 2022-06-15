import React from "react";
import { ITag } from "../../../utils/interface/interface"
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { faClockFour } from "@fortawesome/free-regular-svg-icons";

export const setTalkTag = (tag: ITag) => {
  if (tag.id === "undefined") return <Icon icon={faHashtag} />
  else if (tag.id === "toBeDeleted") return <Icon icon={faClockFour} color="#FFFFFF" />
  else return tag.name.substring(0, 1)
}