import React, { useState } from "react";
import Text from "./components/Text";

import { collection, addDoc, getDoc, doc, query, getDocs, where, onSnapshot, setDoc, limit, startAfter, orderBy, updateDoc, deleteDoc, deleteField, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { app, firebaseAuth, fireStoreDB } from "./firebase/firebase_config";
import { getAuth, signInWithPopup, signInWithRedirect, signOut, GoogleAuthProvider, GithubAuthProvider, onIdTokenChanged, getRedirectResult, setPersistence, updateCurrentUser, browserSessionPersistence, browserLocalPersistence, User } from "firebase/auth";

import Uid from './utils/service/uid'
import { MainBtn } from "./components/Buttons";
import { IMemo, ITag } from "./utils/interface/interface";
import TalkList from "./pages/talk_page/TalkList";
import { dummyMemos2, IDummyMemo } from "./utils/data/dummyData";
import { async } from "@firebase/util";
import { FbTag } from "./firebase/firestore_tag_serivce";
import { FbAuth } from "./firebase/firebase_auth_service";
import { FbMemo } from "./firebase/firestore_memo_service";

export interface INewTag {
  [tagId: string]: ITag;
}

export interface INewMemo {
  [memoId: string]: IDummyMemo;
}

const TagTestPage = () => {
  
  const uid = new Uid();
  const fbAuth = new FbAuth(firebaseAuth, fireStoreDB);
  const fbTag = new FbTag(firebaseAuth, fireStoreDB, "ttt");
  const fbMemo = new FbMemo(firebaseAuth, fireStoreDB, "ttt");

  const [testUser, setTestUser] = useState<User | null>();

  const [tags, setTags] = useState<INewTag>() // 얘는 object 형태 그대로 쓰자.
  const [memo, setMemo] = useState<INewMemo>()

  // const [lastMemo, setLastMemo] = useState<QueryDocumentSnapshot<DocumentData>>()
  
  /* 
    유저 관련
  */
  const loginWithGoogle = async () => {
    fbAuth.loginWithGoogle(setTestUser)
  }

  const loginWithGithub = async () => {
    fbAuth.loginWithGithub(setTestUser)
  }

  const logout = async () => {
    const result = await signOut(firebaseAuth);
    console.log(result)
  }

  React.useEffect(() => {
    fbAuth.lookChangeUpdate(setTestUser)
    fbTag.lookChangeTags()
  }, [])

  /* 
    태그 관련
    */
   const addTag = (tagName: string) => {
     fbTag.addTag(tagName)
    }  
    
const testTargetTag = {
  id: "1655004873392",
  name: "테스트태그",
  color: "#F5F5F5",
  usedMemo: ['memo1']
}
const editTagColor = (tagId: string, newColor: string) => {
  fbTag.editTagColor(tagId, newColor)
}

const editTagName = (tagId: string, newName: string) => {
  fbTag.editTagName(tagId, newName)
}
const deleteTag = (tagId: string) => {
  fbTag.deleteTag(tagId)
}

const updateUsedMemo = (tagId: string, memoId: string) => {
  fbTag.updateUsedMemo(tagId, memoId)
}


const t = {
  id: "tagId",
  name: "테스트태그",
  color: "#F5F5F5",
  usedMemo: ['memo1']
}

React.useEffect(() => {
  if (tags) {
    console.log("찾은 태그", fbTag.findTag(tags, "1655004873392"))
    console.log("전체 태그", tags)
  }
  }, [tags])


  /* 
    메모 관련
  */
 const getMemo = () => {
  fbMemo.getMemo()
 }




  return (
    <>
      <Text>
        테스트 페이지 입니다.
      </Text>

      <MainBtn
        onClick={() => getMemo()}
      >
        메모 불러오기
      </MainBtn>

      <MainBtn
        onClick={() => addTag("테스트태그1")}
      >
        태그 추가
      </MainBtn>

      <MainBtn
        onClick={() => updateUsedMemo("AW34V1URwPbBaAS7WJm7", "테스트메모아이디")}
      >
        태그배열추가
      </MainBtn>

      <MainBtn
        onClick={ () => editTagColor("AW34V1URwPbBaAS7WJm7", "#FF9AA2")}
      >
        태그색 수정
      </MainBtn>

      <MainBtn
        onClick={ () => editTagName("AW34V1URwPbBaAS7WJm7", "새로운 태그명")}
      >
        태그이름수정
      </MainBtn>

      <MainBtn
        onClick={ () => deleteTag("AW34V1URwPbBaAS7WJm7")}
      >
        태그삭제
      </MainBtn>
      
      <Text>
        현재 로그인된 계정 도메인: { testUser && testUser.providerData[0].providerId }
      </Text> 
      <MainBtn
        onClick={() => loginWithGoogle()}
      >
        구글테스트
      </MainBtn>

      <MainBtn
        onClick={() => loginWithGithub()}
      >
        깃허브테스트
      </MainBtn>

      <MainBtn
        onClick={() => logout()}
      >
        로그아웃
      </MainBtn>

    </>
  )
}

export default TagTestPage;