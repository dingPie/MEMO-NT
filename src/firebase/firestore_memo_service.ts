import { Auth, User } from "firebase/auth";
import {
  collection,
  getDoc,
  doc,
  query,
  getDocs,
  where,
  setDoc,
  limit,
  startAfter,
  orderBy,
  updateDoc,
  deleteDoc,
  QueryDocumentSnapshot,
  DocumentData,
  Firestore,
} from "firebase/firestore";
import { IMemo, ITag } from "../utils/interface/interface";
import {
  getUndefinedMemo,
  getToBeDeletedMemo,
  getInitMenualMemo,
} from "./firebase_init_data";

export class FbMemo {
  private firebaseAuth: Auth; // auth 의존성주입
  private fireStoreDB: Firestore;
  private doc: string;
  private lastMemo: QueryDocumentSnapshot<DocumentData> | null | undefined;
  private loadSize: number;

  constructor(firebaseAuth: Auth, fireStoreDB: Firestore) {
    this.firebaseAuth = firebaseAuth;
    this.fireStoreDB = fireStoreDB;
    this.doc = "default";
    this.lastMemo = null;
    this.loadSize = 30;
  }

  initLastMemo() {
    this.lastMemo = null;
  }

  setDoc(user: User) {
    this.doc = user.uid + "_memo";
  }

  getDoc() {
    return this.doc;
  }

  /* 메모 이니셜라이즈 (set) */
  async initMemo() {
    // 태그없음 관련
    const undefinedTime = Date.now();
    const undefinedMemo = getUndefinedMemo(undefinedTime);
    const undefinedRef = doc(
      this.fireStoreDB,
      this.doc,
      undefinedTime.toString()
    );
    // 삭제예정 관련
    const toBeDeletedTime = undefinedTime + 1;
    const toBeDeletedMemo = getToBeDeletedMemo(toBeDeletedTime);
    const toBeDeletedRef = doc(
      this.fireStoreDB,
      this.doc,
      toBeDeletedTime.toString()
    );
    // 매뉴얼 관련
    const initMenualTime = toBeDeletedTime + 1;
    const initMenualMemoArr = getInitMenualMemo(initMenualTime);

    try {
      await setDoc(undefinedRef, undefinedMemo);
      await setDoc(toBeDeletedRef, toBeDeletedMemo);
      initMenualMemoArr.map(async (memo, id) => {
        const initMenualRef = doc(
          this.fireStoreDB,
          this.doc,
          (initMenualTime + id).toString()
        );
        await setDoc(initMenualRef, memo);
      });

      return {
        undefinedMemoId: undefinedTime.toString(),
        toBeDeletedMemoId: toBeDeletedTime.toString(),
        initMenualMemoId: initMenualMemoArr.map((memo, id) => memo.id),
      };
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 메모 불러오기
  async getMemo(memo: IMemo[], update?: (memo: IMemo[]) => void) {
    if (this.lastMemo === undefined) return; // undefined (으로 지정되었으면) 더이상 실행하지 않는다
    const colRef = collection(this.fireStoreDB, this.doc);

    let q = query(colRef, orderBy("createTime", "desc"), limit(this.loadSize));
    if (this.lastMemo)
      q = query(
        colRef,
        orderBy("createTime", "desc"),
        startAfter(this.lastMemo),
        limit(this.loadSize)
      );

    try {
      const querySnapshot = await getDocs(q);
      const result = querySnapshot.docs.map(doc => doc.data() as IMemo);
      console.log("불러올 메모 확인", result)
      if (result === []) this.lastMemo = undefined;
      // 결과지정. 더 불러올 메모가 없으면 undefined로 변경
      else this.lastMemo = querySnapshot.docs[querySnapshot.docs.length - 1];

      if (update) update([...result.reverse(), ...memo]);
      return [...result.reverse(), ...memo] as IMemo[];
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 새 메모 추가
  async addMemo(tagId: string, newContent: string) {
    const nowTime = Date.now();
    const newMemo = {
      id: nowTime.toString(),
      tagId: tagId,
      content: newContent,
      createTime: nowTime,
    };
    const docRef = doc(this.fireStoreDB, this.doc, nowTime.toString());
    try {
      const result = await setDoc(docRef, newMemo);
      console.log("추가된 메모 Id", nowTime.toString());
      return newMemo as IMemo;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 메모 내용 변경
  async editMemoContent(memoId: string, editContent: string) {
    const docRef = doc(this.fireStoreDB, this.doc, memoId);
    try {
      const result = await updateDoc(docRef, {
        content: editContent,
      });
      console.log("메모 내용이 수정되었습니다.");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 메모 태그 변경
  async editMemoUsedTag(memoId: string, newTagId: string) {
    const docRef = doc(this.fireStoreDB, this.doc, memoId);
    try {
      const result = await updateDoc(docRef, {
        tagId: newTagId,
      });
      console.log("메모 태그가 수정되었습니다.");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 메모 삭제
  async deleteMemo(memoId: string) {
    const docRef = doc(this.fireStoreDB, this.doc, memoId);

    try {
      await deleteDoc(docRef);
      console.log(memoId, "메모 삭제완료");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // tagId와 같은 메모를 가져온다.
  async getMemoWithTag(tag: ITag, gridPage?: "gridPage"): Promise<IMemo[]> {
    const col = collection(this.fireStoreDB, this.doc);
    let q = query(col, where("tagId", "==", tag.id));
    if (gridPage) q = query(col, where("tagId", "==", tag.id), limit(3));

    return new Promise((resolve, rejects) => {
      getDocs(q).then(querySnapshot => {
        resolve(querySnapshot.docs.map(doc => doc.data() as IMemo));
      });
    });
  }

  // pinnedMemo 찾아서 가져오기
  async getPinnedMemo(
    memoId: string,
    update?: (v: IMemo) => void
  ): Promise<IMemo> {
    const docRef = doc(this.fireStoreDB, this.doc, memoId);
    const result = await getDoc(docRef);
    if (update) update(result.data() as IMemo);
    return result.data() as IMemo;
  }
}
