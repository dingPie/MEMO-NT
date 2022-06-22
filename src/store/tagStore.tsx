import { User } from 'firebase/auth';
import { observable } from 'mobx';
import { ITag, IUser } from '../utils/interface/interface';


export interface ITagStore {
  tags: ITag[],
  updateTag: (tags: ITag[]) => void;
}


// 프로젝트 하나만.
const tagStore = observable<ITagStore>({
  tags: [],

  updateTag(_tags) {
    this.tags = _tags;
  }
})

export default tagStore;