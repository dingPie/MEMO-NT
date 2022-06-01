import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';

// Page
import LoginPage from './pages/login_page/LoginPage';
import SettingPage from './pages/setting_page/SettingPage';
import TalkPage from './pages/talk_page/TalkPage';
import GridPage from './pages/grid_page/GridPage';
import MemoPage from './pages/memo_page/MemoPage';

// Components
import Header from './components/Header';
import Popup from './components/Popup';
import Text from './components/Text';
import { InputText } from './components/InputText';

import "./App.css"

// const appStyle = {
//   display: "flex",
//   flexDirection: "column",
//   height: "100%"
// }

function App() {
  return (
    <div className="App">
      <GlobalStyle /> 

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/talk" element={<TalkPage />} />
        <Route path="/grid" element={<GridPage />} />
        <Route path="/memo/:tag" element={<MemoPage />} />

      </Routes>
      {/* <MobileBox> */}

      {/* <Header 
        page='talk'
      /> */}
      {/* 헤더가 각 페이지마다 다른 아이콘, 다른 기능으로 들어가기 때문에 이걸 해결하기 위한 함수 분리 or 헤더구성을 미리 해놔야 한다. */}
        
        {/* <Text>
          내용테스트  
        </Text> */}

      {/* <Popup 
        title='테스트 팝업'
      >
        <Text> 테스트용 내용입니다. </Text>
      </Popup> */}


      {/* </MobileBox> */}
    </div>
  );
}

export default App;

export const MobileBox = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  min-width: 20rem;
  max-width: 30rem;
  margin: 0 auto;

  background: ${({theme}) => theme.colors.light_gray} ;
  /* background: white; */
`