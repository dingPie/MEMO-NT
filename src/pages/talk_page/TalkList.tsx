import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { faClockFour } from "@fortawesome/free-regular-svg-icons";
import { IconBox } from "../../components/IconBox";
import { IMemo, ITag } from "../../utils/interface/interface";
import { Time } from "../../utils/service/time";

import useStore from "../../store/useStore";
import { TalkProps } from "./TalkPage";
import { getTagWithMemo } from "./utils/talk_service";
import { setTextLine } from "../../styles/stylesCss";
import TalkListaDefault from "./TalkListaDefault";
import TalkListExpand from "./TalkListExpand";
import { RowBox } from "../../components/FlexBox";

interface ITalkList extends TalkProps {
  memo: IMemo;
  onClickMenuBtn: (memo: IMemo) => void;
  selectedMemo: IMemo | null;
}

const TalkList = ( { tags, memo, selectedMemo,  onClickMenuBtn }: ITalkList ) => {

  const tag = getTagWithMemo(tags, memo);

  const setTalkTag = (expand?: string) => {
    if (tag.id === "undefined") return <Icon icon={faHashtag} />
    else if (tag.id === "toBeDeleted") return <Icon icon={faClockFour} color="#FFFFFF" />

    if (expand) return tag.name
    else return tag.name.substring(0, 1)
  }

  React.useEffect(() => {
    if (selectedMemo === memo) console.log("이 메모가 선택된 메모입니다.", memo)
  }, [selectedMemo])
  

  return(
    <>
    { selectedMemo !== memo ? 
      <TalkListaDefault 
        tag={tag}
        memo={memo}
        talkTagName={setTalkTag()}
        onClickMenuBtn={onClickMenuBtn}
      /> :
      <TalkListExpand 
        tag={tag}
        memo={memo}
        talkTagName={setTalkTag("expand")}
        onClickMenuBtn={onClickMenuBtn}
      />
    }
     
    </>
  )
}

export default TalkList;

export const TalkContent = styled(RowBox)<{lineClamp?: number}>` //  styled.div
  padding: .25rem .5rem;
  ${setTextLine}
`

export const TalkListBox = styled.div<{expand?: boolean}>`
  display: grid;
  grid-template-columns: ${({expand}) => expand ? "1fr 3rem 1.75rem" : "1.75rem 1fr 3rem 1.75rem" };
  gap: .5rem;
  width: 100%;
  padding: 0;
  margin-bottom: .5rem;
`
