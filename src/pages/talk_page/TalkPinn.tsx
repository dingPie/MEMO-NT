import React from "react";
import styled from "styled-components";
import { RowBox } from "../../components/FlexBox";
import { TalkContent } from "./TalkList";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { IconBox } from "../../components/IconBox";
import { oneLineText } from "../../styles/stylesCss";
import { IMemo, ITag } from "../../utils/interface/interface";
import { dummyTags } from "../../utils/data/dummyData";
import useStore from "../../store/useStore";
import { setTalkTag } from "./utils/talk_service";
import { TalkProps } from "./TalkPage";


interface ITalkPinn extends TalkProps {
  memo: IMemo;
  onClickDeletePinn: () => void;
  // onClickExpandPinn: () => void;
}


const TalkPinn = ( { tags, memo, onClickDeletePinn }: ITalkPinn ) => {

  const { palette } = useStore();
  const tag = tags.filter(v => v.id === memo.tagId )[0]

  // const setTalkTag = () => {
  //   if (tag.id === "undefined") return <Icon icon={faHashtag} />
  //   else if (tag.id === "toBeDeleted") return <Icon icon={faClockFour} color="#FFFFFF" />
  //   else return tag.name.substring(0, 1)
  // }

  

  return(
    <PinnBox>

      <IconBox
        bgColor={palette.getColor(tag)} // 테스트 컬러
        width={1.875}
        height={1.875}
      >
        {setTalkTag(tag)}
      </IconBox>

      <PinnContent>
        {memo.content}
      </PinnContent>

      <PinnBtns>
        <IconBox 
          height={1.75}
        >
         <Icon size="lg" icon={faChevronDown} />
        </IconBox>
        <IconBox 
          height={1.75}
          onClick={onClickDeletePinn}
        >
         <Icon size="lg" icon={faTrashCan} />
        </IconBox>
      </PinnBtns>

    </PinnBox>
  )
}
export default TalkPinn;

const PinnBox = styled.div`
  position: fixed;
  top: 3.5rem;
  left: 50%;
  transform: translate(-50%, 0);
  
  display: grid;
  grid-template-columns: 1.75rem 1fr 4rem;
  padding: .5rem;
  gap: .5rem;
  align-items: center;
  
  width: 100%;
  height: 3rem;
  max-width: 30rem;
  background: ${({theme}) => theme.colors.primary_blue };

`

const PinnContent = styled.div`
  padding: .25rem .5rem;
  font-size: .875rem;
  border-radius: 4px;
  background: white;
  
  line-height: 1.5rem ;

  // overflow 속성
  ${oneLineText}
  box-shadow: ${({theme}) => theme.boxShadow.main};
  `

const PinnBtns = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 .25rem;
  gap: .5rem;
  
  width: 4rem;
  height: 2rem;

  background: ${({theme}) => theme.colors.white };
  border-radius: .25rem;
`