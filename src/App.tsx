import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import useStore from "./store/useStore";

// Page
import LoginPage from "./pages/login_page/LoginPage";
import SettingPage from "./pages/setting_page/SettingPage";
import TalkPage from "./pages/talk_page/TalkPage";
import GridPage from "./pages/grid_page/GridPage";
import MemoPage from "./pages/memo_page/MemoPage";

// firebase
import { FbMemo } from "./firebase/firestore_memo_service";
import { FbAuth } from "./firebase/firebase_auth_service";
import { User } from "firebase/auth";
import { FbTag } from "./firebase/firestore_tag_service";

import { ITag, IUserInfo } from "./utils/interface/interface";
import { MobileBox } from "./components/MobileBox";
import IndexPage from "./pages/index_page/IndexPage";

export interface IApp {
  fbAuth: FbAuth;
  fbTag: FbTag;
  fbMemo: FbMemo;
}

const App = ({ fbAuth, fbTag, fbMemo }: IApp) => {
  const { palette, loading } = useStore();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null | false>(false);
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  const [tags, setTags] = useState<ITag[]>([]);

  // 유저 가입여부 체크 및 가입
  const CheckAndInitUser = async (user: User) => {
    const joinedResult = await fbAuth.getUserInfo(user);
    if (joinedResult) return;
    // loading.start();
    console.log("새로 가입을 진행합니다");
    await fbAuth.addUser(user);
    await fbTag.initTag(); // user.uid

    const initMemoId = await fbMemo.initMemo(); // user.uid
    await fbTag.addUsedMemo("undefined", initMemoId!.undefinedMemoId);
    await fbTag.addUsedMemo("toBeDeleted", initMemoId!.toBeDeletedMemoId);

    await fbTag.addUsedMemoAll("initMenual", initMemoId!.initMenualMemoId);
    // loading.finish();
    window.location.reload(); // 첫 유저의 경우, user 정보를 받아오는 것 보다 메모 init이 느린 관계로, 새로고침 작업
  };

  // 메모 로그인시 설정 초기화
  const initAppLogin = async (user: User) => {
    const paletteObj = await fbAuth.getPalette(); // 팔레트 설정
    palette.setPalette(paletteObj);
    fbAuth.setUid(user); // uid 의존성 주입
    fbTag.setDoc(user); // uid 의존성 주입
    fbMemo.setDoc(user); // uid 의존성 주입

    fbTag.onCheckTag(setTags); // 태그정보 실시간체크
    fbAuth.onCheckUserInfo(setUserInfo); // UserDB 정보 실시간체크
    navigate("/talk", { replace: true });
  };

  useEffect(() => {
    fbAuth.onCheckUser(setUser);
    if (user) {
      CheckAndInitUser(user);
      initAppLogin(user);
    }
    if (user === null) navigate("/login");
  }, [user]);

  useEffect(() => {
    console.log("로딩상태 출력", loading.isLoading);
  }, [loading.isLoading]);

  return (
    <MobileBox>
      <GlobalStyle />

      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route
          path="/login"
          element={<LoginPage fbAuth={fbAuth} setUser={setUser} />}
        />
        <Route
          path="/setting"
          element={<SettingPage user={user as User} fbAuth={fbAuth} />}
        />
        <Route
          path="/talk"
          element={
            <TalkPage
              fbAuth={fbAuth}
              fbTag={fbTag}
              fbMemo={fbMemo}
              tags={tags}
              userInfo={userInfo}
            />
          }
        />
        <Route
          path="/grid"
          element={<GridPage fbMemo={fbMemo} fbTag={fbTag} tags={tags} />}
        />
        <Route
          path="/memo/:tagId"
          element={
            <MemoPage
              fbAuth={fbAuth}
              fbMemo={fbMemo}
              fbTag={fbTag}
              tags={tags}
              userInfo={userInfo}
            />
          }
        />
      </Routes>
    </MobileBox>
  );
};

export default App;
