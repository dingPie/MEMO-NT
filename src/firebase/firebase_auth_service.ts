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
  browserLocalPersistence} from "firebase/auth";
import { collection, deleteDoc, doc, Firestore, getDoc, getDocs, setDoc } from "firebase/firestore";
import { IPalette } from "../store/palette";
import { IUser } from "../utils/interface/interface";



export class FbAuth {
  private firebaseAuth: Auth // auth 의존성주입
  private fireStoreDB: Firestore
  private doc: string
  private user: User | null

  constructor(firebaseAuth: Auth, fireStoreDB: Firestore) {
    this.firebaseAuth = firebaseAuth
    this.fireStoreDB = fireStoreDB
    this.doc = "user"
    this.user = null
  }



  // 구글로 로그인
  async loginWithGoogle ( 
    update?: (user: User | null) => void 
    ) {
    await setPersistence(this.firebaseAuth, browserLocalPersistence );
    const googleProvider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.firebaseAuth, googleProvider);

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
    const result = await signInWithPopup(this.firebaseAuth, githubProvider);
    
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
      // console.log("유저정보 감지", user)
    })
  }

  // async setUserReatTime () {
  //   onIdTokenChanged(this.firebaseAuth, (user) => {
  //     this.user = user
  //     console.log( "유저 지정됨", this.user)
  //   })
  // }

  getLoginedUser () {
    return this.user
  }
  
  // 유저 DB에서 값 가져오기
  async getUserInfo (uid: string): Promise<IUser> {
    const docRef = doc(this.fireStoreDB, this.doc, uid)

    return new Promise ( async (resolve, rejects) => {
      const result = await getDoc(docRef)
      resolve(result.data() as IUser)
      console.log("유저정보 확인: ", result.data())
    } )
  }

  // 유저 DB에 유저 추가
  async addUser (user: User) {
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
  
  // 회원 탈퇴
  async withdrawUser (uid: string) {
    const docRef = doc(this.fireStoreDB, this.doc, uid);
    try {
      await deleteDoc(docRef);
      console.log( uid, "유저 정보 삭제완료")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // 색상정보 가져오기 (따로 service 만들기 싫어서)
  async getPalette () : Promise<IPalette> {
    const col = collection(this.fireStoreDB, "palette");
     return new Promise ( async (resolve, reject) => {
      const querySnapshot  = await getDocs(col)
      const paletteArr = querySnapshot.docs.map(v => v.data())
      let obj = {}
      const result = Object.assign(obj, paletteArr)
      resolve(result as unknown as IPalette) // 왜 이렇게하지...
    })
  }

}
