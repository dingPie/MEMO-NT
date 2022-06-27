
import { observable } from 'mobx';





export interface ILoading {
  isLoading: boolean,
  start: () => void,
  finish: () => void,
}


// 프로젝트 하나만.
const loading = observable<ILoading>({
  isLoading: false,
  start() {
    this.isLoading = true
  },
  finish() {
    this.isLoading = false
  }
})

export default loading;