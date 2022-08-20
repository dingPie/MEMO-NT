import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

import Header from "../../components/Header";
import { MobileBox } from "../../components/MobileBox";

import { User } from "firebase/auth";
import { FbMemo } from "../../firebase/firestore_memo_service";
import { FbTag } from "../../firebase/firestore_tag_service";

import { ITag } from "../../utils/interface/interface";

import GridMemo from "./GridMemo";

interface IGridPage {
  tags: ITag[];
  fbMemo: FbMemo;
  fbTag: FbTag;
}

const GridPage = ( { 
  fbMemo, 
  fbTag,
  tags, 
}: IGridPage ) => {

  const navigate = useNavigate();

  const onClickTag = (tag: ITag)  => {
    navigate(`/memo/${tag.id}`, { state: tag })
  }
  const onClickOtherBtn = ()  => {
    navigate(`/talk`)
  }
  
  const usedTag = tags.filter(v => v.usedMemo.length );

 
  return(
    <>
      <Header 
        page='grid' 
        onClickOtherBtn={onClickOtherBtn}
      />
      <GridBox>
        { usedTag.map( tag => {
          return (
            <GridMemo
              key={tag.id}
              tag={tag}
              fbMemo={fbMemo}
              fbTag={fbTag}
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
  overflow-y: scroll ;

`
