import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { FbAuth } from "../../../firebase/firebase_auth_service";
import SetToBeDeletedTime from "./SetToBeDeletedTime";

interface ISetTimeContainer {
  fbAuth: FbAuth;
  user: User;
}

const SetTimeContainer = ({ fbAuth, user }: ISetTimeContainer) => {
  const [toBeDeleteTime, setToBeDeleteTime] = useState(5);

  useEffect(() => {
    // 삭제시간 초기설정 (데이터받아옴)
    const setInitToBeDeleteTime = async () => {
      if (!user) return;
      const nowUser = await fbAuth.getUserInfo();
      setToBeDeleteTime(nowUser.toBeDeletedTime);
    };
    setInitToBeDeleteTime();
  }, []);

  // 삭제시간 설정로직
  const onClickSetDeleteTimeBtn = async () => {
    await fbAuth.updatetoBeDeletedTime(toBeDeleteTime);
  };

  // 삭제시간 상태변경
  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setToBeDeleteTime(parseInt(e.target.value));

  return (
    <>
      <SetToBeDeletedTime
        toBeDeleteTime={toBeDeleteTime}
        onChangeSelect={onChangeSelect}
        onClickSetDeleteTimeBtn={onClickSetDeleteTimeBtn}
      />
    </>
  );
};

export default SetTimeContainer;
