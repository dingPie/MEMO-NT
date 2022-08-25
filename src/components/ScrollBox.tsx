import styled from "styled-components";

interface IScrollBox {
  padding?: string;
}

export const ScrollBox = styled.div<IScrollBox>`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 0.25rem;

  background: white;
  padding: ${({ padding }) => (padding ? padding : ".5rem .25rem 0")};
  border-radius: 1.25rem;

  &::-webkit-scrollbar {
    height: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d3d3d3;
    border-radius: 0.25rem;
    background-clip: padding-box;
    border: 2px solid transparent;
    align-items: center;
  }
`;
