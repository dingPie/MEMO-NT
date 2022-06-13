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
  Auth } from "firebase/auth";
import { deleteDoc, doc, Firestore, getDoc, setDoc } from "firebase/firestore";
import { IUser } from "../utils/interface/interface";



export class FbAuth {
  private firebaseAuth: Auth // auth 의존성주입
  private fireStoreDB: Firestore
  private doc: string

  constructor(firebaseAuth: Auth, fireStoreDB: Firestore) {
    this.firebaseAuth = firebaseAuth
    this.fireStoreDB = fireStoreDB
    this.doc = "user"
  }

  // 구글로 로그인
  async loginWithGoogle ( 
    update: (user: User | null) => void 
    ) {
    await setPersistence(this.firebaseAuth, browserSessionPersistence );
    const googleProvider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.firebaseAuth, googleProvider);

    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential!.accessToken;
    console.log("유저정보", result.user)
    update(result.user)
  }

  // 깃허브로 로그인 
  async loginWithGithub (
    update: (user: User | null) => void 
  ) {
    await setPersistence(this.firebaseAuth, browserSessionPersistence ); // 세션 스토리지 저장. 
    const githubProvider = new GithubAuthProvider();
    const result = await signInWithPopup(this.firebaseAuth, githubProvider);
    
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential!.accessToken;
    console.log( "유저정보", result.user)
    update(result.user)
  }

  //로그아웃
  async logOut () {
    const result = await signOut(this.firebaseAuth);
    console.log(result)
  }

  // 유저정보 변화 감지
  async lookChangeUpdate (
    update: (user: User | null) => void 
  ): Promise<void> {
    onIdTokenChanged(this.firebaseAuth, (user) => {
      update(user)
      console.log( "유저정보 감지: ", user)
    })
  }


  // 유저 있는지 확인
  async checkJoinedUser (
    uid: string
  ): Promise<IUser | undefined> {
    const docRef = doc(this.fireStoreDB, "user", uid); // , orderBy("createTime")
    const result = await getDoc(docRef);
    console.log(result.data())
    return result.data() as IUser | undefined
  }

  // 유저 DB 추가
  async addUser (
    user: User
  ) {
    const newUser = {
      uid: user.uid,
      provider: user.providerId,
      name: user.displayName,
      email: user.email
    }
    const docRef = doc(this.fireStoreDB, this.doc, user.uid)
       try {
        const result = await setDoc(docRef, newUser)
        console.log("새 유저 등록 완료", newUser)
        return newUser
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  }
  
  // 유저 DB에서 값 가져오기
  async getUserInfo (
    uid: string,
    update?: (v: IUser | undefined) => void
  ): Promise<IUser | undefined> {
    const docRef = doc(this.fireStoreDB, this.doc, uid)
    try {
      const result = await getDoc(docRef)
      console.log("유저정보 가져오기", result.data())
      return result.data() as IUser | undefined // IUser or undefined
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 회원 탈퇴
  async withdrawUser (
    uid: string,
  ) {
    const docRef = doc(this.fireStoreDB, this.doc, uid);
    try {
      await deleteDoc(docRef);
      console.log( uid, "유저 정보 삭제완료")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


}
