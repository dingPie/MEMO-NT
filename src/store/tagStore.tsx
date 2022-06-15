import { User } from 'firebase/auth';
import { observable } from 'mobx';
import { ITag, IUser } from '../utils/interface/interface';


export interface ITagStore {
  tag: ITag[]
}


// 프로젝트 하나만.
const tagStore = observable<ITagStore>({
  tag: []
})

export default tagStore;