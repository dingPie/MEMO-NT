import React from "react";
import styled, { css } from "styled-components";
import { RowBox } from "../../../components/FlexBox";
// import { TalkContent } from "../List/TalkList";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faTrashCan, faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { IconBox } from "../../../components/IconBox";
import { IMemo, ITag } from "../../../utils/interface/interface";
import useStore from "../../../store/useStore";
import { setTalkTag } from "../utils/talk_service";
import { TalkContent } from "../utils/TalkComponents";
import { PinnBox, PinnBtns } from "./TalkPinn";

interface ITalkPinnExpand {
  tag: ITag;
  memo: IMemo;
  onClickDeletePinn: () => void;
  onClickReducePinn: () => void;
}

const TalkPinnExpand = ( { tag, memo, onClickDeletePinn, onClickReducePinn }: ITalkPinnExpand ) => {

  const { palette } = useStore();

  return(
    <PinnBox expand>
      <RowBox padding="0" gap={.5}>
        <TalkTagExpand
          height={2}
          bgColor={palette.getColor(tag)} // 테스트 컬러
        >
          {setTalkTag(tag, "expand")}
        </TalkTagExpand>
        <PinnBtns
          width={6}
        >
          <IconBox 
            height={2}
          >
            <Icon size="lg" icon={faAlignLeft} />
          </IconBox>
          <IconBox
            height={2}
            onClick={onClickDeletePinn}
           >
            <Icon size="lg" icon={faTrashCan} />
          </IconBox>
          <IconBox 
            height={2}
            onClick={onClickReducePinn}
          >
            <Icon size="lg" icon={faChevronUp} />
          </IconBox>
        </PinnBtns>
      </RowBox>

      <TalkContent
        shadow
        lineClamp={10}
      >
        {memo.content}
      </TalkContent>

    </PinnBox>
  )
}
export default TalkPinnExpand;

const TalkTagExpand = styled(IconBox)`
  width: 100%;
  border-radius: .25rem;
  justify-content: flex-start;
  padding: 0 .5rem;
`