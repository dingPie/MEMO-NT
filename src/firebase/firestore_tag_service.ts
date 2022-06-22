import { Auth, User } from "firebase/auth";
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
  arrayUnion,
  arrayRemove} from "firebase/firestore";
import { INewTag } from "../TagTestPage";
import { IMemo, ITag } from "../utils/interface/interface";

interface Test {
  name: string,
  color: string | number,
  usedMemo: []
}

export class FbTag {
  private firebaseAuth: Auth // auth 의존성주입
  private fireStoreDB: Firestore
  private doc: string
  private paletteLength: number;

  constructor(firebaseAuth: Auth, fireStoreDB: Firestore) {
    this.firebaseAuth = firebaseAuth
    this.fireStoreDB = fireStoreDB
    this.doc = "default"
    this.paletteLength = 10 // 0, 1번을 제외한 팔레트 수
  }

  setDoc (user: User) {
    this.doc = user.uid+"_tag"
  }

  getDoc () {
    return this.doc
  }

  // 태그 실시간 변화 감시
  async onCheckTag (update?: (tags: ITag[]) => void): Promise<ITag[]> {
    const q = query(collection(this.fireStoreDB, this.doc), orderBy("lastUpdate", "desc")) // , where("name", "!=", false)

   return new Promise( (resolve, reject) =>
    onSnapshot(q, (querySnapshot) => {
      const result: ITag[] = querySnapshot.docs.map(doc => ({id: doc.id,...doc.data()} as ITag ) )
      console.log("태그 변화감시", result)
      if (update) update(result)
      resolve(result)
    }))
  }

  // 첫 유저 기본태그 작성
  async initTag (uid?: string) {
    const undefinedTag = {
      name: "undefined", 
      color: "0", 
      usedMemo: [],
      lastUpdate: 0
    }
    const tobeDeletedTag = {
      name: "toBeDeleted", 
      color: "1", 
      usedMemo: [],
      lastUpdate: 0
    }
    const docId = uid ? uid+"_tag" : this.doc // init 절차 및 인스턴스 생성 범위 때문에 외부 주입도 고려
    const undefinedRef = doc(this.fireStoreDB, docId, "undefined");
    const toBeDeletedRef = doc(this.fireStoreDB, docId, "toBeDeleted");
    try {
      await setDoc(undefinedRef, undefinedTag); 
      await setDoc(toBeDeletedRef, tobeDeletedTag);
      console.log( docId, "기본 태그 생성완료")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 새 태그 추가
  async addTag (
    tagName: string
    ) {
    const newTag: any = {
      name: tagName,
      color: (Date.now()%this.paletteLength + 2).toString() , // 기본 색상
      usedMemo: [],
      lastUpdate: 0
  } 
    const addCollection = collection(this.fireStoreDB, this.doc);
    try {
      const result = await addDoc(addCollection, newTag);
      newTag.id = result.id
      console.log( newTag, "태그 추가완료")
      return newTag as ITag;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 해당 태그에 사용한 메모 추가
  async addUsedMemo (
    tagId: string,
    memoId: string,
  ) {
    const docRef = doc(this.fireStoreDB, this.doc, tagId)
    try {
      await updateDoc( docRef, {
        usedMemo: arrayUnion(memoId),
        lastUpdate: parseInt(memoId)
      }); 
      console.log("사용된 메모id 추가완료")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 해당 태그에 사용한 메모 삭제
  async deleteUsedMemo (
    memo: IMemo,
  ) {
    const docRef = doc(this.fireStoreDB, this.doc, memo.tagId)
    try {
      await updateDoc( docRef, {
        usedMemo: arrayRemove(memo.id)
      }); 
      console.log("바뀐(삭제된) 메모id 삭제완료")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 태그 색상변경
  async editTagColor (
    tagId: string,
    changeColor: string, // 추후 colorCode의 id 방식으로 변경 
    ) {
    const docRef = doc(this.fireStoreDB, this.doc, tagId);
    
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
    changeName: string, 
    ) {
    const docRef = doc(this.fireStoreDB, this.doc, tagId);

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
  async deleteTag (
    tagId: string,
    ) {
    const docRef = doc(this.fireStoreDB, this.doc, tagId);

    try {
      await deleteDoc(docRef);
      console.log( tagId, "태그 삭제완료")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
}
