import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import useStore from './store/useStore';

// Page
import LoginPage from './pages/login_page/LoginPage';
import SettingPage from './pages/setting_page/SettingPage';
import TalkPage from './pages/talk_page/TalkPage';
import GridPage from './pages/grid_page/GridPage';
import MemoPage from './pages/memo_page/MemoPage';

// firebase
import { FbMemo } from './firebase/firestore_memo_service';
import { FbAuth } from './firebase/firebase_auth_service';
import { User } from 'firebase/auth';
import { FbTag } from './firebase/firestore_tag_service';

import { ITag, IUserInfo } from './utils/interface/interface';
import { MobileBox } from './components/MobileBox';




export interface IApp {
  fbAuth: FbAuth;
  fbTag: FbTag;
  fbMemo: FbMemo;
}


const App = ( {fbAuth, fbTag, fbMemo }: IApp ) => {

  const { palette, loading } = useStore();
  const navitage = useNavigate();
  const [user, setUser] = useState<User|null>(null)
  const [userInfo, setUserInfo] = useState<IUserInfo|null>(null)
  const [tags, setTags] = useState<ITag[]>([])

  
  // 유저 가입여부 체크
  const CheckAndInitUser = async (user: User) => {
    const joinedResult = await fbAuth.getUserInfo();
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

  // 메모 설정 초기화
  const initApp = async (user: User) => {
    const paletteObj = await fbAuth.getPalette() // 팔레트 설정
    palette.setPalette(paletteObj)

    fbAuth.setUid(user) // uid 의존성 주입
    fbTag.setDoc(user) // uid 의존성 주입
    fbMemo.setDoc(user) // uid 의존성 주입

    fbTag.onCheckTag(setTags); // 태그정보 실시간체크
    fbAuth.onCheckUserInfo(setUserInfo) // UserDB 정보 실시간체크

    CheckAndInitUser(user) // 유저체크 및 생성
  }
  
  useEffect(() => {
    fbAuth.onCheckUser(setUser);
    if (user) initApp(user)
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
            fbAuth={fbAuth}
            fbTag={fbTag}
            fbMemo={fbMemo}
            tags={tags}
            userInfo={userInfo}
          />} 
        />
        <Route path="/grid" element={
          <GridPage 
            fbMemo={fbMemo}
            fbTag={fbTag}
            user={user}
            tags={tags}
          />} 
          />
        <Route path="/memo/:tagId" element={
          <MemoPage
            fbAuth={fbAuth}
            fbMemo={fbMemo}
            fbTag={fbTag}
            tags={tags}
            userInfo={userInfo}
          />} 
        />
      </Routes>


    </MobileBox>
  );
}

export default App;
