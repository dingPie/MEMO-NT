import React from "react";
import styled from "styled-components";
import { RowBox } from "../../components/FlexBox";
import { TalkTag, TalkContent } from "./TalkList";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faTrashCan, faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { IconBox } from "../../components/IconBox";


const TalkPinnExpand = () => {

  return(
    <PinnBoxExpand>
      <RowBox padding="0" gap={.5}>
        <TalkTagExpand
          color="#E2F0CB" // 테스트 컬러
        >
          테스트 메모
        </TalkTagExpand>
        <PinnBtns>
          <IconBox height={1.75}>
            <Icon size="lg" icon={faChevronUp} />
          </IconBox>
          <IconBox height={1.75}>
            <Icon size="lg" icon={faTrashCan} />
          </IconBox>
          <IconBox height={1.75}>
            <Icon size="lg" icon={faAlignLeft} />
          </IconBox>
        </PinnBtns>
      </RowBox>

      <PinnContent>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum accusamus eos enim ad ipsa rerum velit consequatur est unde odit, labore omnis illum soluta
      </PinnContent>

    </PinnBoxExpand>
  )
}
export default TalkPinnExpand;

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

const PinnBoxExpand = styled(PinnBox)`
  flex-direction: column ;
  height: auto;
  justify-content: flex-start;
`

const PinnContent = styled.div`
  padding: .375rem .5rem;
  font-size: .875rem;
  border-radius: 4px;
  background: white;
  
  width: 100%;
  line-height: 1.25rem ;

  // overflow 속성
  display: -webkit-box;
  overflow-y: hidden;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: pre-wrap;

  box-shadow: ${({theme}) => theme.boxShadow.main};
`

const PinnBtns = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 .25rem;
  gap: .5rem;

  width: 6rem;
  height: 1.75rem;

  background: ${({theme}) => theme.colors.white };
  border-radius: .25rem;
`

const TalkTagExpand = styled(TalkTag)`
  width: 100%;
  border-radius: .25rem;
  align-self: center;
`