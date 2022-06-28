import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import ReactLoading from 'react-loading';

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
import InputText from './components/InputText';

import "./App.css"

//테스트 페이지
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
import Loading from './components/Loading';
import { MobileBox } from './components/MobileBox';

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

  const { palette, loading } = useStore();
  const navitage = useNavigate();
  const [user, setUser] = useState<User|null>(null)
  const [tags, setTags] = useState<ITag[]>([])
  
  // 유저 가입여부 체크
  const CheckAndInitUser = async (user: User) => {
    const joinedResult = await fbAuth.getUserInfo(user.uid);

    if (!joinedResult) {
      loading.start();
      console.log("새로 가입을 진행합니다");
      await fbAuth.addUser(user);
      await fbTag.initTag(user.uid);
      const initMemoId = await fbMemo.initMemo(user.uid);
      await fbTag.addUsedMemo("undefined", initMemoId!.undefinedMemoId);
      await fbTag.addUsedMemo("toBeDeleted", initMemoId!.toBeDeletedMemoId);
      loading.finish();
      window.location.reload(); // 첫 유저의 경우, user 정보를 받아오는 것 보다 메모 init이 느린 관계로, 새로고침 작업
    }
    navitage('/talk', {replace: true})
  }

  // 팔레트 정보 세팅
  const setPalette = async () => {
    const paletteObj = await fbAuth.getPalette()
    palette.setPalette(paletteObj)
  } 
  
  useEffect(() => {
    fbAuth.onCheckUser(setUser);
    if (user) {
      setPalette() // 색상설정 
      fbTag.setDoc(user) // uid 의존성 주입
      fbMemo.setDoc(user) // uid 의존성 주입
      fbTag.onCheckTag(setTags);
      CheckAndInitUser(user) // 유저체크 및 생성
    }
    navitage('/login')
  }, [user])


  return (
    <MobileBox>
      <GlobalStyle /> 

      <Routes>
        <Route path="/login" element={
          <LoginPage
            fbAuth={fbAuth}
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
      </Routes>

      { loading.isLoading &&
        <Loading />
      }
    </MobileBox>
  );
}

export default App;
