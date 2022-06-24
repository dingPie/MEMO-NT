import styled from "styled-components"

export const MobileBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-width: 20rem;
  max-width: 30rem;
  margin: 0 auto;
  background: ${({theme}) => theme.colors.light_gray};
`