import { User } from 'firebase/auth';
import { observable } from 'mobx';
import { ITag, IUser } from '../utils/interface/interface';


export interface IPalette {
  [id: string] : {
    id: string;
    name: string;
    code: string
  }
}

export interface IPaletteStore {
  palette: IPalette,
  setPalette: (v: IPalette) => void;
  getColor: (v: ITag) => string;
}


// 프로젝트 하나만.
const palette = observable<IPaletteStore>({
  palette: {},
  setPalette (_palette) {
    this.palette = _palette
  },
  getColor (tag: ITag) {
    return this.palette[tag.color].code
  }
})

export default palette;