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

      <Header 
        otherIcon='talk'
      />
      {/* 헤더가 각 페이지마다 다른 아이콘, 다른 기능으로 들어가기 때문에 이걸 해결하기 위한 함수 분리 or 헤더구성을 미리 해놔야 한다. */}
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