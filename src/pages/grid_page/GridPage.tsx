import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Header from "../../components/Header";
import { MobileBox } from "../../components/MobileBox";
import { dummyTags, LegacyTag } from "../../utils/data/dummyData";
import { ITag } from "../../utils/interface/interface";
import GridMemo from "./GridMemo";


const GridPage = () => {

  const navigate = useNavigate();

  const onClickTag = (tag: LegacyTag)  => {
    navigate(`/memo/${tag.id}`)
  }
  const onClickOtherBtn = ()  => {
    navigate(`/talk`)
  }

 
  return(
    <>
      <Header 
        page='grid' 
        onClickOtherBtn={onClickOtherBtn}
      />
      <MobileBox>
        <GridBox>
        { dummyTags.map( tag => {
          return (
            <GridMemo 
              tag={tag}
              onClickMemo={() => onClickTag(tag)}
            />
          )
        })}
        
        </GridBox>
      </MobileBox>
    </>
  )
}

export default GridPage;

const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: .5rem;
  padding: 0 .25rem;
`

