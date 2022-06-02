import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { faClockFour } from "@fortawesome/free-regular-svg-icons";
import { IconBox } from "../../components/IconBox";
import { IMemo } from "../../utils/interface/interface";
import { Time } from "../../utils/service/time";

// dummy
import { dummyTags } from '../../utils/data/dummyData'

interface ITalkList {
  memo: IMemo;
}

const TalkList = ( { memo }: ITalkList ) => {

  const time = new Time();
  const tags = dummyTags;
  const tag = tags.filter(v => v.id === memo.tagId )[0]

  console.log(tag.id)
  const setTalkTag = () => {
    if (tag.id === "undefined") return <Icon icon={faHashtag} />
    else if (tag.id === "timeBomb") return <Icon icon={faClockFour} />
    else return tag.name.substring(0, 1)
  }


  return(
    <TalkListEle>
      <TalkTag color={tag.color}>
        {setTalkTag()}
      </TalkTag>
      <TalkContent>
        {memo.content}
      </TalkContent>
      <TalkTime>
        {time.toTalk(memo.createTime)}
      </TalkTime>
      <IconBox 
        shadow width={1.75} height={1.75}
      >
      <Icon size="lg" color="#505050" 
        icon={faEllipsis}
      />
      </IconBox>
    </TalkListEle>
  )
}

export default TalkList;


const TalkListEle = styled.div`
  display: grid;
  grid-template-columns: 1.75rem 1fr 3rem 1.75rem;
  gap: .5rem;
  width: 100%;
  padding: 0;
  margin-bottom: .5rem;
`

const TalkTag = styled.div<{color?: string}>`
  width: 1.75rem;
  height: 1.75rem;
  padding: 0 .5rem;

  font-size: .875rem;
  font-weight: bold;
  line-height: 1.75rem;

  background: ${({color}) => color && color};
  border-radius: 1.75rem;
  box-shadow: ${({theme}) => theme.boxShadow.main};
`

const TalkContent = styled.div`
  padding: .25rem .5rem;
  font-size: .875rem;
  border-radius: 4px;
  background: white;

  // overflow 속성
  display: -webkit-box;
  overflow-y: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: pre-wrap;

  box-shadow: ${({theme}) => theme.boxShadow.main};
`

const TalkTime = styled.div`
  display: flex;
  align-items: flex-end;
  width: 48px;
  height: 28px;
  
  font-weight: 500;
  font-size: 10px;
  text-align: center;
  line-height: 12px;
`