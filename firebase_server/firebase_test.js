import { 
  doc, 
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";

export class FbTest {
  firebaseAuth // auth 의존성주입
  fireStoreDB

  constructor(firebaseAuth, fireStoreDB) {
    this.firebaseAuth = firebaseAuth
    this.fireStoreDB = fireStoreDB

  }

  async getTest (uid) {
    const docRef = doc(this.fireStoreDB, uid+"_tag", "toBeDeleted")
    const result = await getDoc(docRef);
    // console.log(result.data())
    return result.data()
  }

  async addTest (uid) {
    const nowTime = Date.now()
    const newMemo = {
      id: nowTime.toString(),
      tagId: "toBeDeleted",
      content: "새로운 메모 추가: node.js와 node-schedule을 이용하여 추가되었습니다.",
      createTime: nowTime
    }

    const docRef = doc(this.fireStoreDB, uid+"_memo", nowTime.toString())
    try {
      await setDoc(docRef, newMemo)
      console.log("추가된 메모 Id", nowTime.toString())
      return newMemo;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async addUsedMemo (
    uid,
    tagId,
    memoId,
  ) {
    const docRef = doc(this.fireStoreDB, uid+"_tag", tagId)
    try {
        await updateDoc( docRef, {
        usedMemo: arrayUnion(memoId),
        lastUpdate: parseInt(memoId)
      }); 
      console.log(`사용된 메모 ${memoId} 추가완료`)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

}