import { User } from 'firebase/auth';
import { observable } from 'mobx';


export interface IUserStore {
  user: User | null; // or undefined
  logIn: (v: User) => void;
  logOut: () => void;
  updateUser: (v: User | null) => void;
}


// 프로젝트 하나만.
const userStore = observable<IUserStore>({
  user: null,

  logIn (user: User) {
    this.user = user
  },

  logOut () {
    this.user = null
  },

  updateUser (user: User | null) {
    this.user = user
  }
  
})

export default userStore;