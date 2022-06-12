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
import { doc, Firestore, getDoc } from "firebase/firestore";



export class FbAuth {
  private firebaseAuth: Auth // auth 의존성주입
  private fireStoreDB: Firestore

  constructor(firebaseAuth: Auth, fireStoreDB: Firestore) {
    this.firebaseAuth = firebaseAuth
    this.fireStoreDB = fireStoreDB
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
    console.log( "전체정보", result.user)
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
  ) {
    onIdTokenChanged(this.firebaseAuth, (user) => {
      update(user)
      console.log(user)
      return user
    })
  }

  async checkAsignedUser (
    uid: string
  ) {
    const docRef = doc( this.fireStoreDB, "UserDB", uid); // , orderBy("createTime")
    const result = await getDoc(docRef);
    console.log(result.data())
    return result.data()
  }

}
