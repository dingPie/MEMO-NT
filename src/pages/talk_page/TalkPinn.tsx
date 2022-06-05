import React from "react";
import styled from "styled-components";
import { RowBox } from "../../components/FlexBox";
import { TalkTag, TalkContent } from "./TalkList";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { IconBox } from "../../components/IconBox";
import { oneLineText } from "../../styles/stylesCss";


const TalkPinn = () => {

  return(
    <PinnBox>
      <TalkTag
        color="#E2F0CB" // 테스트 컬러
      >
        테
      </TalkTag>
      <PinnContent>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum accusamus eos enim ad ipsa rerum velit consequatur est unde odit, labore omnis illum soluta
      </PinnContent>

      <PinnBtns>

        <IconBox height={1.75}>
         <Icon size="lg" icon={faChevronDown} />
        </IconBox>
        <IconBox height={1.75}>
         <Icon size="lg" icon={faTrashCan} />
        </IconBox>

      </PinnBtns>

    </PinnBox>
  )
}
export default TalkPinn;

const PinnBox = styled.div`
  position: fixed;
  align-items: center;
  top: 56px;
  left: 50%;
  transform: translate(-50%, 0);
  max-width: 30rem;
  background: ${({theme}) => theme.colors.primary_blue };
  justify-content: space-between;

  display: flex;
  padding: 8px 12px;
  gap: 8px;

  width: 100%;
  height: 48px;
`

const PinnContent = styled.div`
  padding: .25rem .5rem;
  font-size: .875rem;
  border-radius: 4px;
  background: white;
  
  width: 100%;
  line-height: 1.25rem ;

  // overflow 속성
  ${oneLineText}
  /* display: -webkit-box;
  overflow-y: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: pre-wrap; */

  box-shadow: ${({theme}) => theme.boxShadow.main};
`

const PinnBtns = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 .25rem;
  gap: .5rem;

  width: 4rem;
  height: 1.75rem;

  background: ${({theme}) => theme.colors.white };
  border-radius: .25rem;
`