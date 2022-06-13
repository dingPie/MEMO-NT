import React, { useState } from "react";
import Text from "./components/Text";

import { collection, addDoc, getDoc, doc, query, getDocs, where, onSnapshot, setDoc, limit, startAfter, orderBy, updateDoc, deleteDoc, deleteField, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { app, firebaseAuth, fireStoreDB } from "./firebase/firebase_config";
import { getAuth, signInWithPopup, signInWithRedirect, signOut, GoogleAuthProvider, GithubAuthProvider, onIdTokenChanged, getRedirectResult, setPersistence, updateCurrentUser, browserSessionPersistence, browserLocalPersistence, User } from "firebase/auth";

import Uid from './utils/service/uid'
import { MainBtn } from "./components/Buttons";
import { IMemo } from "./utils/interface/interface";
import TalkList from "./pages/talk_page/TalkList";
import { dummyMemos2, IDummyMemo } from "./utils/data/dummyData";
import { async } from "@firebase/util";
import { FbTag } from "./firebase/firestore_tag_serivce";

const TestPage = () => {

  const uid = new Uid();

  const [testArray, setTestArray] = useState<IMemo[]>([])
  const [testmemo, setTestmemo] = useState<IDummyMemo>(dummyMemos2)

  const [lastMemo, setLastMemo] = useState<QueryDocumentSnapshot<DocumentData>>()

  const [testUser, setTestUser] = useState<User>()
  
  // const auth = getAuth(app);
  const loginWithGoogle = async () => {
    await setPersistence(firebaseAuth, browserSessionPersistence );
    const googleProvider = new GoogleAuthProvider();
    const result = await signInWithPopup(firebaseAuth, googleProvider);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential!.accessToken;
    const user = result.user;
    console.log( "전체정보", result)
    setTestUser(user)
    // console.log("유저정보", user.email, user.uid )
  }

  const loginWithGithub = async () => {
    await setPersistence(firebaseAuth, browserSessionPersistence ); // 세션 스토리지 저장. 
    const githubProvider = new GithubAuthProvider();
    const result = await signInWithPopup(firebaseAuth, githubProvider);
    
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential!.accessToken;
    const user = result.user;
    console.log( "전체정보", result)
  }

  const logout = async () => {
    const result = await signOut(firebaseAuth);
    console.log(result)
  }

  const userTest = async () => {
    await updateCurrentUser(firebaseAuth, testUser!)
  }

  React.useEffect(() => {
    onIdTokenChanged(firebaseAuth, (user) => {
      console.log(user)
    })
  }, [])
  

  const 첫유저체크 = async (uid: string) => {
    const docRef = doc(fireStoreDB, "UserDB", uid); // , orderBy("createTime")
    const querySnapshot = await getDoc(docRef);
    console.log(querySnapshot)
    console.log(querySnapshot.data())
  }

  const 새유저등록 = async (uid: string) => {
    const addData = { uid: uid }
    try {
      await setDoc(doc(fireStoreDB, "UserDB", uid), addData);
      console.log("해당 문서에 추가되었습니다.")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }



  // 문서 추가. id는 Date.now의 String값으로 한다. 내부의 id는 date가 대신할 수 있다.
  const addTest = async () => {
    const testId = Date.now();
    const addData = {
      // id: testId,
      tagId: "undefined",
      content: "setDoc Test 7",
      createTime: testId
    }
    try {
      await setDoc(doc(fireStoreDB, "memo2", testId.toString()), addData);
      console.log("해당 문서에 추가되었습니다.")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 문서 업데이트 
  const updateTest =  async () => {
    const updateRef = doc(fireStoreDB, "memo2", "1654699888645"); // 두번쨰 값 업데이트 테스트 
    // Set the "capital" field of the city 'DC'
    await updateDoc(updateRef, {
      content: "업데이트 되었습니다."
    });
  }

  
  const deleteTest =  async () => {
    const deleteRef = doc(fireStoreDB, "memo2", "1654699888645"); // 두번쨰 값 업데이트 테스트 '
    await deleteDoc(deleteRef);

    // 문서의 필드 일부삭제
    // await updateDoc(deleteRef, {
    //   createTime: deleteField() // 해당 필드를 삭제한다.
    // });
  }

  const readTestOne = async () => {
    const q = query(collection(fireStoreDB, "memoData"), where("content", "==", "이 내용을 가져오고싶어!"));
    
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs )
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }
  
  const readAll = async () => {
    const q = query(collection(fireStoreDB, "memo2")); // , orderBy("createTime")

    const querySnapshot = await getDocs(q);
    let res = querySnapshot.docs.map(doc => doc.data() as IMemo )
    setTestArray(res)

    // const result: IMemo[] = []
    // querySnapshot.forEach((doc) => {
    //   result.push(doc.data() as IMemo)
    // });
    // setTestArray(result)
  }

  const 태그바로읽기 = async () => {
    const docRef = doc(fireStoreDB, "testDB", "tagsTest")

    const test = onSnapshot(docRef, (doc) => {
      console.log("태그값 읽어오기", doc.data())
    })
  }

  const 태그추가 = async (uid: string) => {
    const testId = Date.now();
    const docRef = doc(fireStoreDB, uid, "tagsTest");
    const addData = {
      // id: testId,
      id: "tag2",
      name: "태그2",
      color: "#000000",
      usedMemo: []
    }
    try {
      await setDoc(docRef, addData);
      console.log( uid, "태그가 추가되었습니다.")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
  // 새 태그 추가
  const 태그업데이트 = async (uid: string) => { 
    const tagId = Date.now();
    const newTag = {
      // id: testId,
      id: "tag2",
      name: "태그2내용수정", // 수정할 내용
      color: "#000000", // 수정할 태그 
      usedMemo: []
    }
    const docRef = doc(fireStoreDB, uid, "tagsTest");
    try {
      await updateDoc(docRef, {tag2: newTag}); // 이렇게 추가해줘야 정상적으로 업데이트된다.
      console.log( uid, "태그가 추가되었습니다.")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  React.useEffect(() => {
    태그바로읽기()
  }, [])
  

  const snapshotTest = async () => {
    // doc(fireStoreDB, "memoData", "BGJfG8GoLRNXcUgwyEmB")
    const q = query(collection(fireStoreDB, "memo2"));

    const unsub = onSnapshot(q, ( snapshot ) => {
      const data = snapshot.docs.map(doc => doc.data() as IMemo )
      console.log(data)
      setTestArray(data)
  });
  }

  const snapshotTest2 = async () => {
    // doc(fireStoreDB, "memoData", "BGJfG8GoLRNXcUgwyEmB")
    let q = query(collection(fireStoreDB, "memo2")
      ,orderBy("createTime","desc"), 
      limit(3)
    );

    if (lastMemo) {
      q = query(collection(fireStoreDB, "memo2")
      ,orderBy("createTime","desc"),
      startAfter(lastMemo),
      limit(3)
    );
    }

    const snapshotDocs = onSnapshot(q, ( snapshot ) => {
      const data = snapshot.docs.map(doc => doc.data() as IMemo )
      console.log(data)
      setTestArray(data)
      setLastMemo(snapshot.docs[snapshot.docs.length-1])
    });

  }

  


  // 페이지네이션과 같은 형식으로 받아오는 함수.
  // 무한 스크롤 구현에 용이하다.
  const getPageDataTest = async () => {
    // 데이터를 일부씩 받아오는 함수
    const first = query(collection(fireStoreDB, "memoData"), 
    orderBy("createTime","desc"), 
    limit(3));

    const firstDoc = await getDocs(first);
    firstDoc.forEach(doc => console.log(doc.data()))
    
    // Get the last visible document
    const lastVisible = firstDoc.docs[firstDoc.docs.length-1];
    console.log("last", lastVisible);
    setLastMemo(lastVisible)
    // Construct a new query starting at this document,
    // get the next 3 cities.
    const second = query(collection(fireStoreDB, "memoData"),
        orderBy("createTime","desc"), // orderby 먼저
        startAfter(lastVisible), // 선택조건 
        limit(3)); // 가져올 갯수
    const secondDoc = await getDocs(second);
    secondDoc.forEach(doc => console.log(doc.data()))

  }

  
  // React.useEffect(() => {
  //   console.log(lastMemo)
  // }, [lastMemo])

  // React.useEffect(() => {
  //   console.log(testArray)
  // }, [testArray])

  React.useEffect(() => {
   if (testUser) console.log(testUser)
  }, [testUser])

  const onClickTest = () => {
    console.log("따란!")
  }
  
  console.log(dummyMemos2[0])


  const fbTag = new FbTag(firebaseAuth, fireStoreDB, "테스트용유저아이디");
  const 태그이니셜라이즈 = async () => {
    await fbTag.initTag()
  }









  return (
    <>
      <Text>
        테스트 페이지 입니다.
      </Text>
      
      { testArray &&
        testArray.map( memo => {
         return <TalkList 
            memo={memo}
            onClickMenuBtn={onClickTest}
          /> })
      }

      <MainBtn
        primary
        onClick={() => addTest()}
      >
        메모 추가
      </MainBtn>

      <MainBtn
        primary
        onClick={() => readTestOne()}
      >
        메모 읽기
      </MainBtn>

      <MainBtn
        onClick={() => readAll()}
      >
        메모 전체 읽기
      </MainBtn>

      <MainBtn
        onClick={() => updateTest()}
      >
        메모 업데이트
      </MainBtn>

      <MainBtn
        onClick={() => deleteTest()}
      >
        메모 삭제
      </MainBtn>

      <MainBtn
        onClick={() => snapshotTest()}
      >
        onSnapShot
      </MainBtn>

      <MainBtn
        onClick={() => getPageDataTest()}
      >
        getPage
      </MainBtn>

      <MainBtn
        onClick={() => snapshotTest2()}
      >
        스냅샷
      </MainBtn>

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
        onClick={() => userTest()}
      >
        유저저장 테스트
      </MainBtn>
      
      <MainBtn
        onClick={() => 새유저등록("test")}
      >
        새유저등록
      </MainBtn>

      <MainBtn
        onClick={() => 첫유저체크("test1")}
      >
        첫유저체크 
      </MainBtn>

      <MainBtn
        onClick={() => 태그추가("testDB")}
      >
        태그추가 
      </MainBtn>

      <MainBtn
        onClick={() => 태그업데이트("testDB")}
      >
        태그업뎃
      </MainBtn>

      <MainBtn
        onClick={() => 태그이니셜라이즈()}
      >
        태그초기화
      </MainBtn>

      { testmemo &&
        Object.values(testmemo)
              .filter(v => v.tagId === "tag1")
              .map( memo => {
                return <TalkList
                  key={memo.id}
                  memo={memo as IMemo}
                  onClickMenuBtn={onClickTest}
                /> })
      }


    </>
  )
}

export default TestPage;