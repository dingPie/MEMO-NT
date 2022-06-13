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
import { RowBox } from "./components/FlexBox";

export interface INewTag {
  [tagId: string]: ITag;
}

export interface INewMemo {
  [memoId: string]: IDummyMemo;
}

interface ITest {
  fbMemo: FbMemo
}

const TagTestPage = ( {fbMemo}: ITest ) => {
  
  const uid = new Uid();
  const fbAuth = new FbAuth(firebaseAuth, fireStoreDB);
  const fbTag = new FbTag(firebaseAuth, fireStoreDB, "ttt");
  // const fbMemo = new FbMemo(firebaseAuth, fireStoreDB, "ttt");
  
  const [testUser, setTestUser] = useState<User | null>(null);
  
  const [tags, setTags] = useState<ITag[]>() // 얘는 object 형태 그대로 쓰자.
  const [memo, setMemo] = useState<IMemo[]>([])
  const [lastLoadedMemo, setLastLoadedMemo] = useState(null)


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
  // 실시간으로 유저 로그인상황 체크 하기 
  const checkJoinedUser = (uid: string) => {
    fbAuth.checkJoinedUser(uid)
  }
   // 유저DB에서 유저 정보 가져오기
  const getUserInfo = (uid: string) => {
    fbAuth.getUserInfo(uid)
  }
  // 유저 추가 및 memo / tag init
  const addUser = async (user: User | null) => {
    if (!user) return
    const newUser = await fbAuth.addUser(user)
    await fbTag.initTag(newUser!.uid)
    fbMemo.setUser(newUser!.uid)
    fbTag.setUser(newUser!.uid)
    
    const initMemoId = await fbMemo.initMemo(newUser!.uid)
    console.log( "이니셜라이즈 메모 아이디", initMemoId)
    fbTag.addUsedMemo("undefined", initMemoId!.undefinedMemoId )
    fbTag.addUsedMemo("toBeDeleted", initMemoId!.toBeDeletedMemoId )
  }
  // 회원탈퇴 (회원DB에서 삭제 + uid_memo / uid_tag collection 삭제해야 함.)
  const withdrawUser = (user: User | null) => {
    if (!user) return
    fbAuth.withdrawUser(user.uid)
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
    fbTag.addUsedMemo(tagId, memoId)
  }


React.useEffect(() => {
  if (tags) {
    // console.log("찾은 태그", fbTag.findTag(tags, "1655004873392"))
    console.log("전체 태그", tags)
  }
  }, [tags])


  /* 
    메모 관련
  */
 const getMemo = async () => {
  const t = await fbMemo.getMemo(memo, setMemo)
  // setMemo([...memo, ...t])
  console.log(t)
 }

 const initMemo = () => {
  fbMemo.initMemo()
 }

 const addMemo = async (
  tagId: string,
  newContent: string
 ) => {
  // tagId 검색 시스템에 대해 좀 더 생각해보자!
  const newMemo = await fbMemo.addMemo(tagId, newContent)
  fbTag.addUsedMemo("undefined", newMemo!.id)
 }

 const editMemoContent = async (
  memoId: string,
  editContent: string
  ) => {
  await fbMemo.editMemoContent(memoId, editContent)
 }

 const editMemoUsedTag = async (
  memoId: string,
  newTagId: string
  ) => {
    // memo[0].id 이런식으로 이전 id값 뽑아내야함.
  await fbMemo.editMemoUsedTag(memoId, newTagId)
  fbTag.addUsedMemo(newTagId, memoId)
  fbTag.deleteUsedMemo("undefined", memoId)
  // 태그 usedMemo 수정
 }

 const deleteMemo = async (
  memoId: string,
  tagId: string
  ) => {
  await fbMemo.deleteMemo(memoId);
  fbTag.deleteUsedMemo(tagId, memoId)
 }


  return (
    <>
      <Text>
        테스트 페이지 입니다.
      </Text>

      { memo &&
        memo.map( v => <div> {v.content} </div> )
      }

      <RowBox>
        <MainBtn
          onClick={() => getMemo()}
        >
          메모 불러오기
        </MainBtn>
        <MainBtn
          onClick={() => initMemo()}
        >
          메모 초기화
        </MainBtn>
        <MainBtn
          onClick={() => addMemo("undefined", "새로운 메모 추가 테스트")}
        >
          메모 추가
        </MainBtn>

        <MainBtn
          onClick={() => editMemoContent("1655047759787", "메모내용 수정테스트")}
        >
          메모내용수정
        </MainBtn>
        <MainBtn
          onClick={() => editMemoUsedTag("1655047759787", "toBeDeleted")}
        >
          메모태그수정
        </MainBtn>
        <MainBtn
          onClick={() => deleteMemo("1655047759787", "toBeDeleted")}
        >
          메모삭제
        </MainBtn>
      </RowBox>




      <RowBox>
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
      </RowBox>

      <Text>
        현재 로그인된 계정 도메인: { testUser && testUser.providerData[0].providerId }
      </Text> 
      <RowBox>
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
        <MainBtn
          onClick={() => checkJoinedUser("testUid")}
        >
          가입유저체크
        </MainBtn>
        <MainBtn
          onClick={() => getUserInfo("testUid")}
        >
          유저정보조회
        </MainBtn>
        <MainBtn
          onClick={() => addUser(testUser)}
        >
          새유저추가
        </MainBtn>
        <MainBtn
          onClick={() => withdrawUser(testUser)}
        >
          유저탈퇴
        </MainBtn>

        
        
      </RowBox>
    </>
  )
}

export default TagTestPage;