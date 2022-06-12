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
  FieldValue,
  arrayUnion} from "firebase/firestore";
import { INewTag } from "../TagTestPage";
import { ITag } from "../utils/interface/interface";


export class FbTag {
  private firebaseAuth: Auth // auth 의존성주입
  private fireStoreDB: Firestore
  private uid: string

  constructor(firebaseAuth: Auth, fireStoreDB: Firestore, uid: string) {
    this.firebaseAuth = firebaseAuth
    this.fireStoreDB = fireStoreDB
    this.uid = uid+"_tag"
  }

  // 태그 변화 감지
  // async lookChangeTags (
  //   update: (tag: INewTag) => void 
  // ) {
  //   const docRef = doc(this.fireStoreDB, this.uid)

  //   onSnapshot(docRef, (doc) => {
  //     console.log("태그값 읽어오기", doc.data())
  //     update(doc.data() as INewTag) // 이거 수정해야 할수도
  //   })
  // }

  async lookChangeTags (
    update?: (tag: ITag) => void 
  ) {
    const q = query(collection(this.fireStoreDB, this.uid), where("name", "!=", false))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const t = querySnapshot.docs.map(doc => doc.data())
      console.log("여러 문서 감시?하기", t)
    });
  }

  // 첫 유저 기본태그 작성
  async initTag () {
    const undefinedTag = {
      name: "태그 없음", 
      color: "#F5F5F5", 
      usedMemo: []
    }
    const tobeDeletedTag = {
      name: "삭제 예정", 
      color: "#505050", 
      usedMemo: []
    }
    const undefinedRef = doc(this.fireStoreDB, this.uid, "undefined");
    const toBeDeletedRef = doc(this.fireStoreDB, this.uid, "toBeDeleted");
    try {
      await setDoc(undefinedRef, undefinedTag); 
      await setDoc(toBeDeletedRef, tobeDeletedTag);
      console.log( this.uid, "기본 태그 생성완료")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 새 태그 추가
  async addTag (tagName: string) {
    const newTag = {
      name: tagName,
      color: "#F5F5F5", // 기본 색상
      usedMemo: []
  } 
    const addCollection = collection(this.fireStoreDB, this.uid);
    try {
      const result = await addDoc(addCollection, newTag);
      console.log( result.id, "태그 추가완료")
      return result.id
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 사용한 메모 업데이트
  async updateUsedMemo (
    tagId: string,
    memoId: string,
  ) {
    const docRef = doc(this.fireStoreDB, this.uid, tagId)
    try {
      await updateDoc( docRef, {
        usedMemo: arrayUnion(memoId)
      }); 
      console.log("사용한 메모 추가완료")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 태그 색상변경
  async editTagColor (
    tagId: string,
    changeColor: string, // 추후 colorCode의 id 방식으로 변경 
    ) {
    const docRef = doc(this.fireStoreDB, this.uid, tagId);
    
    try {
      await updateDoc( docRef, {
        color: changeColor
      });
      console.log( tagId, "태그의 태그색을", changeColor, "으로 수정완료")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 태그 이름 변경
  async editTagName (
    tagId: string,
    changeName: string, // 추후 colorCode의 id 방식으로 변경 
    ) {
    const docRef = doc(this.fireStoreDB, this.uid, tagId);

    try {
      await updateDoc( docRef, {
        name: changeName
      } ); // 이렇게 추가해줘야 정상적으로 업데이트된다.
      console.log( tagId, "태그의 태그명을", changeName, "으로 수정완료")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 태그 삭제
  // async deleteTag (
  //   targetTag: ITag,
  //   ) {
  //   const updateTag = {
  //     [targetTag.id]: deleteField()
  //   }
    
  //   const docRef = doc(this.fireStoreDB, this.uid, "tags");
  //   try {
  //     await updateDoc( docRef, updateTag ); // 이렇게 추가해줘야 정상적으로 업데이트된다.
  //     console.log( targetTag.id, "태그 삭제완료")
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }

  async deleteTag (
    tagId: string,
    ) {
    const docRef = doc(this.fireStoreDB, this.uid, tagId);

    try {
      await deleteDoc(docRef);
      console.log( tagId, "태그 삭제완료")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 태그찾기는 state에서 찾는걸로 구성하자.
  findTag (
    tags: INewTag,
    tagId: string
  ) {
    return tags[tagId]
  }
  
}
