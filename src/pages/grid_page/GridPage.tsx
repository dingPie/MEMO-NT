import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

import Header from "../../components/Header";
import { MobileBox } from "../../components/MobileBox";

import { User } from "firebase/auth";
import { FbMemo } from "../../firebase/firestore_memo_service";
import { FbTag } from "../../firebase/firestore_tag_service";

import { dummyTags, LegacyTag } from "../../utils/data/dummyData";
import { ITag } from "../../utils/interface/interface";

import GridMemo from "./GridMemo";

interface IGridPage {
  user: User | null;
  tags: ITag[];
  fbMemo: FbMemo;
  fbTag: FbTag;
}

const GridPage = ( { tags, user, fbMemo, fbTag }: IGridPage ) => {

  const navigate = useNavigate();

  const onClickTag = (tag: LegacyTag)  => {
    navigate(`/memo/${tag.id}`, { state: tag })
  }
  const onClickOtherBtn = ()  => {
    navigate(`/talk`)
  }
  
  const usedTag = tags.filter(v => v.usedMemo.length > 0 );

 
  return(
    <>
      <Header 
        page='grid' 
        onClickOtherBtn={onClickOtherBtn}
      />
      <GridBox>
      { usedTag.map( (tag, id) => {
        return (
          <GridMemo
            key={id}
            fbMemo={fbMemo}
            fbTag={fbTag}
            tag={tag}
            onClickMemo={() => onClickTag(tag)}
          />
        )
      })}
      </GridBox>
    </>
  )
}

export default GridPage;

const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: .5rem;
  padding: .5rem;


`

