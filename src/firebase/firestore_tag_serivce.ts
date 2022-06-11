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
  Firestore} from "firebase/firestore";
import { ITag } from "../utils/interface/interface";

  export class FbTag {
    private firebaseAuth: Auth // auth 의존성주입
    private fireStoreDB: Firestore
  
    constructor(firebaseAuth: Auth, fireStoreDB: Firestore) {
      this.firebaseAuth = firebaseAuth
      this.fireStoreDB = fireStoreDB
    }

    async lookChangeTags (
      uid: string,
      update: (tag: ITag | undefined) => void 
    ) {
      const docRef = doc(this.fireStoreDB, uid, "tags")

      onSnapshot(docRef, (doc) => {
        console.log("태그값 읽어오기", doc.data())
        // update(doc.data() as ITag | undefined) // 이거 수정해야 할수도
      })
    }

    async initTag (
      uid: string
    ) {
      const initTag = {
        "undefined": {
          id: "undefined",
          name: "태그 없음", 
          color: "#F5F5F5", 
          usedMemo: []
        },
        "toBeDeleted": {
          id: "toBeDeleted",
          name: "삭제 예정", 
          color: "#505050", 
          usedMemo: []
        },
      }
      const docRef = doc(this.fireStoreDB, uid, "tags");
      try {
        await setDoc(docRef, initTag); // 이렇게 추가해줘야 정상적으로 업데이트된다.
        console.log( uid, "기본 태그 생성완료")
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    async newTag () {

    }
  
  
  }
  