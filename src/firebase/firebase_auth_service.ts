import { rejects } from "assert";
import { 
  signInWithPopup, 
  signOut, 
  GoogleAuthProvider, 
  GithubAuthProvider, 
  onIdTokenChanged, 
  getRedirectResult, 
  setPersistence, 
  updateCurrentUser, 
  browserSessionPersistence, 
  User, 
  Auth, 
  browserLocalPersistence, 
  signInWithRedirect,
  UserCredential
} from "firebase/auth";
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
  updateDoc,
  onSnapshot
} from "firebase/firestore";
import { IPalette } from "../store/palette";
import { IMemo, ITag, IUserInfo } from "../utils/interface/interface";
import { Time } from "../utils/service/time";


const time = new Time();

export class FbAuth {
  private firebaseAuth: Auth // auth 의존성주입
  private fireStoreDB: Firestore
  private doc: string
  private user: User | null
  private uid: string;

  constructor(firebaseAuth: Auth, fireStoreDB: Firestore) {
    this.firebaseAuth = firebaseAuth
    this.fireStoreDB = fireStoreDB
    this.doc = "user"
    this.user = null
    this.uid = ""
  }

  setUid (user: User) {
    this.uid = user.uid
  }

  getUid () {
    return this.uid
  }


  // 구글로 로그인
  async loginWithGoogle ( 
    update?: (user: User | null) => void 
    ) {
    await setPersistence(this.firebaseAuth, browserLocalPersistence );
    const googleProvider = new GoogleAuthProvider();

    // const result = await signInWithPopup(this.firebaseAuth, googleProvider);
    const result: UserCredential = await signInWithRedirect(this.firebaseAuth, googleProvider);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential!.accessToken;
    console.log("유저정보", result.user)
    if(update) update(result.user)
    return result.user
  }

  // 깃허브로 로그인 
  async loginWithGithub (
    update?: (user: User | null) => void 
  ) {
    await setPersistence(this.firebaseAuth, browserSessionPersistence ); // 세션 스토리지 저장. 
    const githubProvider = new GithubAuthProvider();
    
    // const result = await signInWithPopup(this.firebaseAuth, githubProvider);
    const result: UserCredential = await signInWithRedirect(this.firebaseAuth, githubProvider);

    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential!.accessToken;
    console.log( "유저정보", result.user)
    if(update) update(result.user)
  }

  //로그아웃
  async logOut () {
    const result = await signOut(this.firebaseAuth);
    console.log(result)
  }


  // 유저정보 변화 감지
  async onCheckUser (
    update?: (user: User | null) => void 
  ) {
    onIdTokenChanged(this.firebaseAuth, (user) => {
      if(update) update(user)
      console.log("유저정보 감지", user)
    })
  }

  getLoginedUser () {
    return this.user
  }


  // userDB의 user정보 확인
  async onCheckUserInfo (update?: (tags: IUserInfo) => void): Promise<IUserInfo> {
    const q = query(collection(this.fireStoreDB, this.doc))
    const docRef = doc(this.fireStoreDB, this.doc, this.uid)
    return new Promise( (resolve, reject) =>
    onSnapshot(docRef, (doc) => {
      const result = doc.data() as IUserInfo
      // const result: ITag[] = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as ITag ) )
      console.log("유저정보 변화 감지", result)
      if (update) update(result)
      resolve(result)
    }))
  }

  
  // 유저 DB에서 값 가져오기
  async getUserInfo (): Promise<IUserInfo> {
    const docRef = doc(this.fireStoreDB, this.doc, this.uid)

    return new Promise ( async (resolve, rejects) => {
      const result = await getDoc(docRef)
      resolve(result.data() as IUserInfo)
    } )
  }

  // 유저 DB에 유저 추가
  async addUser (user: User) {
    const newUser = {
      uid: user.uid,
      pinndMemo: "", // pinnedMemo Id
      toBeDeletedTime: 3, // number 삭제 예정시간
      toBeDeletedDate: time.getToBeDeletedDate()
    }
    const docRef = doc(this.fireStoreDB, this.doc, user.uid)
      try {
      await setDoc(docRef, newUser)
      console.log("새 유저 등록 완료", newUser)
      return newUser
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
  // 회원 탈퇴
  async withdrawUser () {
    const docRef = doc(this.fireStoreDB, this.doc, this.uid);
    try {
      await deleteDoc(docRef);
      console.log( this.uid, "유저 정보 삭제완료")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  
  // 색상정보 가져오기 (따로 service 만들기 싫어서)
  async getPalette () : Promise<IPalette> {
    const col = collection(this.fireStoreDB, "palette") ;
    const q = query(col, orderBy("id", "asc")) 

     return new Promise ( async (resolve, reject) => {
      const querySnapshot  = await getDocs(q)
      const paletteArr = querySnapshot.docs.map(v => v.data())
      let obj = {}
      const result = Object.assign(obj, paletteArr)
      resolve(result as unknown as IPalette) // 왜 이렇게하지...
    })
  }

  // 삭제예정시간 업데이트
  async updatetoBeDeletedTime (newTime: number ) {
    const docRef = doc(this.fireStoreDB, this.doc, this.uid)
    updateDoc(docRef, { toBeDeletedTime: newTime })
    console.log("삭제시간 변경완료",newTime )
  }

  // 핀 설정
  async setPinnedMemo (memoId: string) {
    console.log("현재 uid", this.uid)
    const docRef = doc(this.fireStoreDB, this.doc, this.uid)
    await updateDoc(docRef, { pinnedMemo: memoId })
  }


}
