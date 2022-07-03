
import { 
  doc, 
  collection, 
  deleteDoc, 
  Firestore, 
  getDoc, 
  getDocs, 
  orderBy, 
  query, 
  setDoc, 
  where,
  updateDoc
} from "firebase/firestore";



export class FbAuth {
  firebaseAuth // auth 의존성주입
  fireStoreDB
  doc
  user

  constructor(firebaseAuth, fireStoreDB) {
    this.firebaseAuth = firebaseAuth
    this.fireStoreDB = fireStoreDB
    this.doc = "user"
    this.user = null
  }




  async 삭제유저가져오기 (hour, toBeDeletedDate) {
    const col = collection(this.fireStoreDB, "user")
    const q = query(col, where("toBeDeletedTime", "==", hour), where("toBeDeletedDate", "==", toBeDeletedDate))

    const querySnapshot = await getDocs(q);
    const testResult = querySnapshot.docs.map(data => data.id );
    return testResult
  }

  async 삭제일업데이트 (uid) {
    const 내일삭제예정일 = new Date(new Date().setDate(new Date().getDate()+1)).toLocaleDateString();
    const docRef = doc(this.fireStoreDB, "user", uid)
    await updateDoc(docRef, {
      toBeDeletedDate: 내일삭제예정일
    })
    console.log(uid, "의 삭제일 예정 업데이트 완료")
  }

  async 오늘삭제예정메모가져오기 (uid) {
    const col = collection(this.fireStoreDB, uid+"_memo");
    // const q = query(col, where("createTime", "<", 오늘타임존구하기()), where("tagId", "==", "toBeDeleted"))
    const q = query(col, where("tagId", "==", "toBeDeleted"))
    const querySnapshot = await getDocs(q)
    const testResult = querySnapshot.docs.map(data => data.data());
    return testResult
  }

  async 메모삭제 (uid, memoId) {
    const docRef = doc(this.fireStoreDB, uid+"_memo", memoId);
    await deleteDoc(docRef);
    console.log("삭제완료:", memoId)
  }
  
  async 유즈드메모업데이트 (uid, memoArr) {
    const docRef = doc(this.fireStoreDB,  uid+"_tag", "toBeDeleted")
    const uidArr = memoArr.map(memo => memo.id)
    await updateDoc(docRef, { usedMemo: uidArr } );
  }

  async 빈태그가져오기 (uid) {
    const col = collection(this.fireStoreDB, uid+"tag");
    // const q = query(col, where("createTime", "<", 오늘타임존구하기()), where("tagId", "==", "toBeDeleted"))
    const q = query(col, where("usedMemo", "==", "toBeDeleted"))
    const querySnapshot = await getDocs(q)
    const testResult = querySnapshot.docs.map(data => data.data());
    return testResult
  }

}


const 오늘타임존구하기 = () => {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.getTime()
}