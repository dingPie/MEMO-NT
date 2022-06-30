import { scheduleJob } from 'node-schedule';
import { firebaseAuth, fireStoreDB } from './firebase_config.js';
import { FbTest } from './firebase_test.js';

import express, { Router } from 'express';
const router = Router();

// config.js에서 export한 모듈을 다음과 같이 import 시킬 수 있다. (같은 디렉토리 위치)

// localhost:3000/firebase/save 호출
const app = express();
const PORT = 4001;
// app.use(cors());

const testUid = "fzS15Mw52afyVi7Q52jIARI2AhR2"

const fbTest = new FbTest(firebaseAuth, fireStoreDB);
app.get('/', (req, res) => {
  const job = scheduleJob('45 * * * * *', async () =>{
    // const cronTest = await fbTest.getTest("fzS15Mw52afyVi7Q52jIARI2AhR2")
    // console.log("크론으로 실행한 firebase:", cronTest)

    const newMemo = await fbTest.addTest(testUid)
    await fbTest.addUsedMemo(testUid, "toBeDeleted", newMemo.id)
  });
  res.send("통신 성공")
})

// 포트 연결부분
app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
})