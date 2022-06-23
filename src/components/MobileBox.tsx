import styled from "styled-components"

export const MobileBox = styled.div<{height?: string}>`
  display: relative;
  width: 100%;
  height: ${({height}) => height && height };
  min-width: 20rem;
  max-width: 30rem;
  margin: 0;
  padding: .5rem;
  background: ${({theme}) => theme.colors.light_gray};
`