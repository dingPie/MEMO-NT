import React from 'react';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';

// Components
import Header from './components/Header';
import Popup from './components/Popup';
import Text from './components/Text';

function App() {
  return (
    <div className="App">
      <GlobalStyle /> 

      <Header />
      <MobileBox>
  gd
        {/* <Popup 
          title='테스트 팝업'
        >
          <Text> 테스트용 내용입니다. </Text>
        </Popup> */}


      </MobileBox>
    </div>
  );
}

export default App;

const MobileBox = styled.div`
  /* min-width: 32rem ;
  max-width: 480px;
  width: 100%;
  height: 100%; */

  background: ${({theme}) => theme.colors.primary_blue} ;
  min-width: 20rem;
  max-width: 30rem;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: white;
`