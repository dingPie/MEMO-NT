import { rejects } from "assert";
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
import { resolve } from "path";
import { INewTag } from "../TagTestPage";
import { IMemo, ITag } from "../utils/interface/interface";


export class FbMemo {
  private firebaseAuth: Auth // auth 의존성주입
  private fireStoreDB: Firestore
  private doc: string
  private lastMemo: QueryDocumentSnapshot<DocumentData> | null | undefined
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
    this.loadSize = 20
  }

  initLastMemo () {
    this.lastMemo = null;
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
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 메모 불러오기
  async getMemo (
    memo?: IMemo[],
    update?: (memo: IMemo[]) => void
  ) {
    if (this.lastMemo === undefined) return // undefined (으로 지정되었으면) 더이상 실행하지 않는다
    const colRef = collection(this.fireStoreDB, this.doc )

    let q = query(colRef, orderBy("createTime", "desc"), limit(this.loadSize));
    if (this.lastMemo) q = query(colRef, orderBy("createTime", "desc"), startAfter(this.lastMemo), limit(this.loadSize));
    
    try {
      const querySnapshot = await getDocs(q);
      const result = querySnapshot.docs.map(doc => doc.data() as IMemo)

      if (result === []) this.lastMemo = undefined; // 결과지정. 더 불러올 메모가 없으면 undefined로 변경
      else this.lastMemo = querySnapshot.docs[querySnapshot.docs.length-1]

      if (update) update([...result.reverse(), ...memo!])
      return [...result.reverse(), ...memo!] as IMemo[]
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

  // tagId와 같은 메모를 전부 가져온다.
  async getMemoWithTag (tag: ITag, gridPage?: "gridPage" ): Promise<IMemo[]> {
    let q = query(collection(this.fireStoreDB, this.doc), where("tagId", "==", tag.id)); 
    if (gridPage) q = query(collection(this.fireStoreDB, this.doc), where("tagId", "==", tag.id), limit(3));

    return new Promise( async(resolve, rejects) => {
      const querySnapshot = await getDocs(q);
      const result = querySnapshot.docs.map(doc => doc.data() as IMemo)
      resolve(result)
    })
  }

  
  // 딱 세개만 가져오는걸 해야되는데..
  // async getUsedMemo (usedMemo: string[], update?: (v: IMemo[]) => void ): Promise<IMemo[]> {
  //   const col = collection(this.fireStoreDB, this.doc)
  //   const q = query(col, where("id", "in", usedMemo.slice(0,3) )); // where 조건문 in은 array 10개까지만 지원하므로 limit(3) 대신 slice를 사용하였다.

  //   return new Promise( async(resolve, rejects) => {
  //     const querySnapshot = await getDocs(q);
  //     const result = querySnapshot.docs.map(doc => doc.data() as IMemo)
  //     if (update) update(result)
  //     resolve(result)
  //   })
  // }

}
