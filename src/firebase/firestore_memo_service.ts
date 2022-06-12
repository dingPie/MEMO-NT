import { Auth } from "firebase/auth";
import { 
  collection,
  addDoc, 
  getDoc, 
  doc, 
  query, 
  getDocs, 
  where, 
  onSnapshot, 
  setDoc, 
  limit, 
  startAfter, 
  orderBy, 
  updateDoc, 
  deleteDoc, 
  deleteField, 
  QueryDocumentSnapshot, 
  DocumentData, 
  Firestore,
  collectionGroup} from "firebase/firestore";
import { INewTag } from "../TagTestPage";
import { IMemo, ITag } from "../utils/interface/interface";


export class FbMemo {
  private firebaseAuth: Auth // auth 의존성주입
  private fireStoreDB: Firestore
  private uid: string
  private lastMemo: QueryDocumentSnapshot<DocumentData> | null
  private loadSize: number

  constructor(firebaseAuth: Auth, fireStoreDB: Firestore, uid: string) {
    this.firebaseAuth = firebaseAuth
    this.fireStoreDB = fireStoreDB
    this.uid = uid
    this.lastMemo = null
    this.loadSize = 1
  }

  /* 메모 이니셜라이즈 (set) */
  async initMemo () {
    const undefinedTime = Date.now();
    const toBeDeletedTime = undefinedTime + 1;
    const initMemo = {
      [undefinedTime.toString()]: {
        id: undefinedTime.toString(),
        tagId: "undefined",
        content: "태그 없는 메모 내용입니다", 
        createTime: undefinedTime
      },
      [toBeDeletedTime]: {
        id: toBeDeletedTime.toString(),
        tagId: "toBeDeleted",
        content: "삭제될 메모 내용입니다", 
        createTime: toBeDeletedTime
      },
    }
    const docRef = doc(this.fireStoreDB, this.uid, "memo");
    try {
      await setDoc(docRef, initMemo); // 이렇게 추가해줘야 정상적으로 업데이트된다.
      console.log( this.uid, "기본 메모 생성완료")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async getMemo () {
    const colRef = collection(this.fireStoreDB, this.uid )
    const dofRef = doc(this.fireStoreDB, this.uid, "memo")
    // const colRef = collection(this.fireStoreDB, `${this.uid}/memo`)

    let q = query(colRef, orderBy("memo", "desc"));
    // if (this.lastMemo) {
    //   q = query(colRef, orderBy("createTime","desc"), startAfter(this.lastMemo), limit(this.loadSize));
    // }

 
    onSnapshot(q, ( snapshot ) => {
      const data = snapshot.docs.map(doc => doc.data() as IMemo )
      console.log("메모값 불러오기", data)
      this.lastMemo = snapshot.docs[snapshot.docs.length-1]
      // setTestArray(data)
    });
  
    
  }

}
