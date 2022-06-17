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
  collectionGroup} from "firebase/firestore";
import { INewTag } from "../TagTestPage";
import { IMemo, ITag } from "../utils/interface/interface";


export class FbMemo {
  private firebaseAuth: Auth // auth 의존성주입
  private fireStoreDB: Firestore
  private doc: string
  private lastMemo: QueryDocumentSnapshot<DocumentData> | null
  private loadSize: number

  constructor(
    firebaseAuth: Auth, 
    fireStoreDB: Firestore, 
    // uid: string | null, 
    // lastMemo: QueryDocumentSnapshot<DocumentData> | null
    ) {
    this.firebaseAuth = firebaseAuth
    this.fireStoreDB = fireStoreDB
    // this.doc = !uid ? "test" : uid+"_memo"
    this.doc = "default"
    this.lastMemo = null
    this.loadSize = 50
  }
  
  setDoc (user: User) {
    this.doc = user.uid+"_memo"
  }

  getDoc () {
    return this.doc
  }

  /* 메모 이니셜라이즈 (set) */
  async initMemo (
    uid?: string
  ) {
    const undefinedTime = Date.now();
    const docId = uid ? uid+"_memo" : this.doc // init 절차 및 인스턴스 생성 범위 때문에 외부 주입도 고려
    const undefinedMemo = {
      id: undefinedTime.toString(),
      tagId: "undefined",
      content: "태그 없는 메모 내용입니다", 
      createTime: undefinedTime
    }
    const undefinedRef = doc(this.fireStoreDB, docId, undefinedTime.toString());

    const toBeDeletedTime = undefinedTime+1;
    const toBeDeletedMemo =  {
        id: toBeDeletedTime.toString(),
        tagId: "toBeDeleted",
        content: "삭제될 메모 내용입니다", 
        createTime: toBeDeletedTime
      }
    const toBeDeletedRef = doc(this.fireStoreDB, docId, toBeDeletedTime.toString());
    
    try {
      await setDoc(undefinedRef, undefinedMemo);
      await setDoc(toBeDeletedRef, toBeDeletedMemo);
      return { undefinedMemoId: undefinedTime.toString(), toBeDeletedMemoId: toBeDeletedTime.toString() }
      console.log( docId, "기본 메모 생성완료")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 메모 불러오기
  async getMemo (
    memo?: IMemo[],
    update?: (memo: IMemo[]) => void
  ) {
    const colRef = collection(this.fireStoreDB, this.doc )
    let q = query(colRef, limit(this.loadSize));
    if (this.lastMemo) {
      console.log("여기 실행됨")
      q = query(colRef, startAfter(this.lastMemo), limit(this.loadSize));
    }
    try {
      const querySnapshot = await getDocs(q);
      const result = querySnapshot.docs.map(doc => doc.data() as IMemo )
      this.lastMemo = querySnapshot.docs[querySnapshot.docs.length-1]
      if (update) update([...memo!, ...result])
      return result
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
  }

  // 새 메모 추가
  async addMemo (
    tagId: string,
    newContent: string
  ) {
    const nowTime = Date.now()
    const newMemo = {
      id: nowTime.toString(),
      tagId: tagId,
      content: newContent,
      createTime: nowTime
    }
    const docRef = doc(this.fireStoreDB, this.doc, nowTime.toString())
    try {
      const result = await setDoc(docRef, newMemo)
      console.log("추가된 메모 Id", nowTime.toString())
      return newMemo as IMemo;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 메모 내용 변경
  async editMemoContent (
    memoId: string,
    editContent: string
  ) {

    const docRef = doc(this.fireStoreDB, this.doc, memoId)
    try {
      const result = await updateDoc(docRef, {
        content: editContent
      })
      console.log("메모 내용이 수정되었습니다.");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 메모 태그 변경
  async editMemoUsedTag (
    memoId: string,
    newTagId: string
  ) {

    const docRef = doc(this.fireStoreDB, this.doc, memoId)
    try {
      const result = await updateDoc(docRef, {
        tagId: newTagId
      })
      console.log("메모 태그가 수정되었습니다.")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 메모 삭제
  async deleteMemo (
    memoId: string,
    ) {
    const docRef = doc(this.fireStoreDB, this.doc, memoId);

    try {
      await deleteDoc(docRef);
      console.log( memoId, "태그 삭제완료")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

}
