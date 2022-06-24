import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, } from 'react-router-dom';
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

//테스트 페이지
import TestPage from './TestPage';
import TagTestPage from './TagTestPage';
import { firebaseAuth, fireStoreDB } from './firebase/firebase_config';
import { FbMemo } from './firebase/firestore_memo_service';
import { FbAuth } from './firebase/firebase_auth_service';
import useStore from './store/useStore';
import { MainBtn } from './components/Buttons';
import { User } from 'firebase/auth';
import { FbTag } from './firebase/firestore_tag_service';
import { ITag } from './utils/interface/interface';
import { IPalette } from './store/palette';
import { toJS } from 'mobx';

// const appStyle = {
//   display: "flex",
//   flexDirection: "column",
//   height: "100%"
// }

interface IApp {
  fbAuth: FbAuth;
  fbTag: FbTag;
  fbMemo: FbMemo;
}


function App( {fbAuth, fbTag, fbMemo }: IApp ) {

  const { palette, tagStore } = useStore();
  const navitage = useNavigate();
  const [user, setUser] = useState<User|null>(null)
  const [tags, setTags] = useState<ITag[]>([])
  

  const CheckAndInitUser = async (user: User) => {
    const joinedResult = await fbAuth.getUserInfo(user.uid);
    if (joinedResult) return

    console.log("가입되지 않은 유저니까 init해줘야 해요!")
    await fbAuth.addUser(user)
    await fbTag.initTag(user.uid)
    const initMemoId = await fbMemo.initMemo(user.uid)
    fbTag.addUsedMemo("undefined", initMemoId!.undefinedMemoId)
    fbTag.addUsedMemo("toBeDeleted", initMemoId!.toBeDeletedMemoId)
    console.log("정상적으로 init 완료")
  }
  
  const setPalette = async () => {
    const paletteObj = await fbAuth.getPalette()
    palette.setPalette(paletteObj)
    console.log( "팔레트 정보", palette.palette)
  } 
  
  useEffect(() => {
    if (user) {
      setPalette() // 색상설정 
      fbTag.setDoc(user) // uid 의존성 주입
      fbMemo.setDoc(user) // uid 의존성 주입
      CheckAndInitUser(user) // 유저체크 및 생성
      navitage('/talk')
    }
    else if (user === null) {
      navitage('/login')
    }
  }, [user])

  // 가장 처음: user 및 tag 정보를 실시간으로 받아와, state에 저장
  useEffect(() => {
    if (!user) fbAuth.onCheckUser(setUser);
    else if (user) fbTag.onCheckTag(setTags);
  }, [user])
  

  

  return (
    <>
      <GlobalStyle /> 

      <Routes>
        <Route path="/login" element={
          <LoginPage
            user={user}
            setUser={setUser} 
          />} 
         />
        <Route path="/setting" element={
          <SettingPage 
            user={user}
            setUser={setUser}
            fbAuth={fbAuth}
          />}
        />
        <Route path="/talk" element={
          <TalkPage
            user={user}
            tags={tags}
            setTags={setTags}
            fbMemo={fbMemo}
            fbTag={fbTag}
          />} 
        />
        <Route path="/grid" element={
          <GridPage 
            user={user}
            tags={tags}
            fbMemo={fbMemo}
            fbTag={fbTag}
          />} 
          />
        <Route path="/memo/:tagId" element={
          <MemoPage
            fbMemo={fbMemo}
            fbTag={fbTag}
            tags={tags}
          />} 
        />

        <Route path="/test" element={<TestPage />} />
        <Route path="/tagtest" element={<TagTestPage fbMemo={fbMemo} />} />
      </Routes>
    </>
  );
}

export default App;

