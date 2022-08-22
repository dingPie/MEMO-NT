import React, { memo } from "react";
import useStore from "../../../store/useStore";

import { RowBox } from "../../../components/FlexBox";

import { ITag } from "../../../utils/interface/interface";

import TagOptions from "./TagOptions";
import styled from "styled-components";
import { ScrollBox } from "../../../components/ScrollBox";

interface ITalkInputOption {
  tags: ITag[];
  recommTag: ITag | null;
  onClickTagOption: (v?: string) => void;
}

const TalkInputOption = ({
  tags,
  recommTag,
  onClickTagOption,
}: ITalkInputOption) => {
  const { palette } = useStore();
  const recentTags = tags.filter(
    v => v.id !== "undefined" && v.id !== "toBeDeleted"
  ); // .slice(0, 3)
  // firebase에서 sort시, sort 된 옵션으로 불러와진다!

  return (
    <InputOptionBox>
      <ScrollBox>
        {recentTags.map(tag => (
          <TagOptions
            key={tag.id}
            onClickTagOption={() => onClickTagOption(tag.name)}
            tagColor={palette.getColor(tag)}
            tagName={tag.name}
          />
        ))}
      </ScrollBox>
      <RowBox gap={0.25} padding="0" justifyEnd>
        {recommTag && (
          <TagOptions
            onClickTagOption={() => onClickTagOption(recommTag.name)}
            tagColor={palette.getColor(recommTag)}
            tagName={recommTag.name} // 태그 추천 관련 로직 적용
          />
        )}

        <TagOptions
          onClickTagOption={() => onClickTagOption("")}
          tagColor="#F5F5F5"
          tagName="#"
        />
      </RowBox>
    </InputOptionBox>
  );
};

export default TalkInputOption;

const InputOptionBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 8rem;
  align-items: stretch;
  gap: 0.5rem;

  width: 100%;
  min-height: 2.5rem;
  padding: 0 0.5rem;
  background: white;
`;
