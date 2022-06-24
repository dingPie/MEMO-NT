import styled from "styled-components";
import { RowBox } from "../../../components/FlexBox";
import { setTextLine } from "../../../styles/stylesCss";

interface ITalkContent {
  lineClamp?: number;
  lineHieght?: number;
}
export const TalkContent = styled(RowBox)<ITalkContent>`
  padding: .25rem .5rem;
  background: white;
  border-radius: .25rem;
  line-height: ${({lineHieght}) => lineHieght ? lineHieght + "rem" : "1.125rem" };
  ${setTextLine};
`

export const MenuBox = styled(RowBox)`
  align-items: center;
  padding: .25rem;
  background: white;
  // transition 적용 여부때문에 일단 보류
`