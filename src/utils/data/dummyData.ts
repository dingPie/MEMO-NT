import { ITag, IMemo, IUser, IDeleteTime } from "../interface/interface";



export const dummyTags: ITag[] = [
  {
    id: "undefined",
    name: "태그 없음",
    color: "#F5F5F5",
    usedMemo: ["memo5"]
  },
  {
    id: "timeBomb",
    name: "삭제 예정",
    color: "#505050",
    usedMemo: ["memo6", "memo7"]
  },
  {
    id: "tag1",
    name: "테스트",
    color: "#FF9AA2",
    usedMemo: ["memo1", "memo2"]
  },
  {
    id: "tag2",
    name: "태그",
    color: "#FFB7B2",
    usedMemo: ["memo3", "memo8"]
  },
  {
    id: "tag3",
    name: "테스트용 태그",
    color: "#FFDAC1",
    usedMemo: ["memo4"]
  }
]


//실제 state에서 사용 형태 
export const dummyMemos: IMemo[] = [
  {
    id: "memo1",
    tagId: "tag1",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam beatae voluptate, molestiae tenetur eveniet blanditiis impedit autem similique, obcaecati praesentium ea totam eligendi placeat iure provident expedita tempora.",
    createTime: 1654183548345
  },
  {
    id: "memo2",
    tagId: "tag1",
    content: "Lorem ipsum dolor sit amet",
    createTime: 1654183548345
  },
  {
    id: "memo3",
    tagId: "tag2",
    content: "한글 테스트 내용입니다.",
    createTime: 1654183548345
  },
  {
    id: "memo4",
    tagId: "tag3",
    content: "세번째 태그 테스트 내용입니다.",
    createTime: 1654183548345
  },
  {
    id: "memo5",
    tagId: "undefined",
    content: "태그없이 생성한 메모",
    createTime: 1654183548345
  },
  {
    id: "memo6",
    tagId: "timeBomb",
    content: "삭제예정 메모입니다.",
    createTime: 1654183548345
  },
  {
    id: "memo7",
    tagId: "timeBomb",
    content: "consectetur adipisicing elit. Laboriosam beatae voluptate,",
    createTime: 1654183548345
  },
  {
    id: "memo8",
    tagId: "tag2",
    content: "molestiae tenetur eveniet blanditiis impedit autem similique",
    createTime: 1654183548345
  }
]


export interface IMemoTest {
  id?: string;
  tagId: string;
  content: string;
  createTime: number;
}

export interface IDummyMemo {
  [id: string ] : IMemoTest;
}

// firebase에 저장된 형태
export const dummyMemos2: IDummyMemo = { 
  "memo1": {
    id: "memo1",
    tagId: "tag1",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam beatae voluptate, molestiae tenetur eveniet blanditiis impedit autem similique, obcaecati praesentium ea totam eligendi placeat iure provident expedita tempora.",
    createTime: 1654183548345
  },
  "memo2": {
    id: "memo2",
    tagId: "tag1",
    content: "Lorem ipsum dolor sit amet",
    createTime: 1654183548345
  },
  "memo3": {
    id: "memo3",
    tagId: "tag2",
    content: "한글 테스트 내용입니다.",
    createTime: 1654183548345
  },
  "memo4": {
    id: "memo4",
    tagId: "tag3",
    content: "세번째 태그 테스트 내용입니다.",
    createTime: 1654183548345
  },
  "memo5": {
    id: "memo5",
    tagId: "undefined",
    content: "태그없이 생성한 메모",
    createTime: 1654183548345
  },
  "memo6": {
    id: "memo6",
    tagId: "timeBomb",
    content: "삭제예정 메모입니다.",
    createTime: 1654183548345
  },
  "memo7": {
    id: "memo7",
    tagId: "timeBomb",
    content: "consectetur adipisicing elit. Laboriosam beatae voluptate,",
    createTime: 1654183548345
  },
  "memo8": {
    id: "memo8",
    tagId: "tag2",
    content: "molestiae tenetur eveniet blanditiis impedit autem similique",
    createTime: 1654183548345
  }
}



// 색상코드
export const colors = [
  { 
    id: 0,
    name: "Light Salmon Pink",
    code: "#FF9AA2"
  },
  { 
    id: 1,
    name: "Melon",
    code: "#FFB7B2"
  },
  { 
    id: 2,
    name: "Very Pale Orange",
    code: "#FFDAC1"
  },
  { 
    id: 3,
    name: "Dirty White",
    code: "#E2F0CB"
  },
  { 
    id: 4,
    name: "Magic Mint",
    code: "#B5EAD7"
  },
  { 
    id: 5,
    name: "Crayola's Periwinkle",
    code: "#C7CEEA"
  },
  { 
    id: 6,
    name: "Baby Blue",
    code: "#87C7F1"
  },
  { 
    id: 7,
    name: "Little Girl Pink",
    code: "#FEB7D3"
  },
  { 
    id: 8,
    name: "Peach",
    code: "#FFEDA9"
  },
  { 
    id: 9,
    name: "Pale Lavender",
    code: "#EACFFF"
  },
]