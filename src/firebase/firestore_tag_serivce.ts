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
  private uid: string

  constructor(firebaseAuth: Auth, fireStoreDB: Firestore, uid: string) {
    this.firebaseAuth = firebaseAuth
    this.fireStoreDB = fireStoreDB
    this.uid = uid
  }

  // 태그 변화 감지
  async lookChangeTags (
    // update: (tag: ITag | undefined) => void 
  ) {
    const docRef = doc(this.fireStoreDB, this.uid, "tags")

    onSnapshot(docRef, (doc) => {
      console.log("태그값 읽어오기", doc.data())
      // update(doc.data() as ITag | undefined) // 이거 수정해야 할수도
    })
  }

  // 첫 유저 기본태그 작성
  async initTag () {
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
    const docRef = doc(this.fireStoreDB, this.uid, "tags");
    try {
      await setDoc(docRef, initTag); // 이렇게 추가해줘야 정상적으로 업데이트된다.
      console.log( this.uid, "기본 태그 생성완료")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async addTag (
    tagName: string,
    usedMemo: string,
  ) {
    const tagId = Date.now().toString() ;
    const newTag = {
      [tagId]: {
      id: tagId,
      name: tagName, // 새 태그 내용
      color: "#F5F5F5", // 기본 색상
      usedMemo: [usedMemo] // 현재 메모 사용
    }
  }
    const docRef = doc(this.fireStoreDB, this.uid, "tags");
    try {
      await updateDoc( docRef, newTag ); // 이렇게 추가해줘야 정상적으로 업데이트된다.
      console.log( newTag, "태그가 추가완료")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 태그찾기는 state에서 찾는걸로 구성하자.
  async findTag (
    tagId: string
  ) {
    const docRef = doc(this.fireStoreDB, this.uid, "tags");
    const q = query(collection(this.fireStoreDB, this.uid, "tags", tagId))
    // const docSnap = await getDoc(docRef);
    const querySnapshot = await getDocs(q);
    const result =  querySnapshot.docs.map(doc => doc.data() as ITag )
    console.log( "찾은 태그", result)
    return result
    // try {
    // console.log("읽어온 태그:", docSnap.data());
    // return docSnap.data()
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    // }
  }
  

  async editTagColor (
    targetTag: ITag,
    changeColor: string, // 추후 colorCode의 id 방식으로 변경 
  ) {
    const updateTag = {
      [targetTag.id]: {
        ...targetTag,
        color: changeColor
      }
    }

    const docRef = doc(this.fireStoreDB, this.uid, "tags");
    try {
      await updateDoc( docRef, updateTag ); // 이렇게 추가해줘야 정상적으로 업데이트된다.
      console.log( targetTag.id, "태그의 태그색을", changeColor, "으로 수정완료")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async editTagName (
    targetTag: ITag,
    changeName: string, // 추후 colorCode의 id 방식으로 변경 
  ) {
    const updateTag = {
      [targetTag.id]: {
        ...targetTag,
        name: changeName
      }
    }

    const docRef = doc(this.fireStoreDB, this.uid, "tags");
    try {
      await updateDoc( docRef, updateTag ); // 이렇게 추가해줘야 정상적으로 업데이트된다.
      console.log( targetTag.id, "태그의 태그명을", changeName, "으로 수정완료")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async deleteTag (
    targetTag: ITag,
  ) {
    const updateTag = {
      [targetTag.id]: deleteField()
    }

    const docRef = doc(this.fireStoreDB, this.uid, "tags");
    try {
      await updateDoc( docRef, updateTag ); // 이렇게 추가해줘야 정상적으로 업데이트된다.
      console.log( targetTag.id, "태그 삭제완료")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

}
