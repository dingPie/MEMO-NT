import React, { useState } from "react";
import Text from "./components/Text";

import { collection, addDoc, getDoc, doc, query, getDocs, where, onSnapshot, setDoc, limit, startAfter, orderBy, updateDoc, deleteDoc, deleteField } from "firebase/firestore";
import { fireStoreDB } from "./firebase/firebase_config";

import Uid from './utils/service/uid'
import { MainBtn } from "./components/Buttons";
import { IMemo } from "./utils/interface/interface";
import TalkList from "./pages/talk_page/TalkList";
import { dummyMemos2, IDummyMemo } from "./utils/data/dummyData";

const TestPage = () => {

  const uid = new Uid();

  const [testArray, setTestArray] = useState<IMemo[]>([])

  const [testmemo, setTestmemo] = useState<IDummyMemo>(dummyMemos2)

  // 문서 추가. id는 Date.now의 String값으로 한다. 내부의 id는 date가 대신할 수 있다.
  const addTest = async () => {
    const testId = Date.now();
    const addData = {
      // id: testId,
      tagId: "timeBomb",
      content: "setDoc Test 2",
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
    const q = query(collection(fireStoreDB, "memo2", "1654699888645") );
    
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot.docs )
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }
  
  const readAll = async () => {
    const q = query(collection(fireStoreDB, "memo2")); // , orderBy("createTime")

    const querySnapshot = await getDocs(q);
    const result: IMemo[] = []
    querySnapshot.forEach((doc) => {
      result.push(doc.data() as IMemo)
      console.log(doc.id, " => ", doc.data());
    });
    setTestArray(result)
  }

  const snapshotTest = async () => {
    const unsub = onSnapshot(doc(fireStoreDB, "memoData", "BGJfG8GoLRNXcUgwyEmB"), (doc) => {
      const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      console.log(source, " data: ", doc.data());
      console.log("Current data: ", doc.data());
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
    
    // Construct a new query starting at this document,
    // get the next 3 cities.
    const second = query(collection(fireStoreDB, "memoData"),
        orderBy("createTime","desc"), // orderby 먼저
        startAfter(lastVisible), // 선택조건 
        limit(3)); // 가져올 갯수
    const secondDoc = await getDocs(second);
    secondDoc.forEach(doc => console.log(doc.data()))

  }

  React.useEffect(() => {
    console.log(testArray)
  }, [testArray])

  const onClickTest = () => {
    console.log("따란!")
  }
  
  console.log(dummyMemos2[0])

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
      

      { testmemo &&
        Object.values(testmemo)
        .filter(v => v.tagId === "tag1")
        .map( memo => {
          return <TalkList 
             memo={memo as IMemo}
             onClickMenuBtn={onClickTest}
           /> })
      }


    </>
  )
}

export default TestPage;