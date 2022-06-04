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
    </div>
  );
}

export default App;

