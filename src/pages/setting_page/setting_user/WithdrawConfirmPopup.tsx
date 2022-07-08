import React from "react";
import { User } from "firebase/auth";

import Popup from "../../../components/Popup";
import Text from "../../../components/Text";
import { FbAuth } from "../../../firebase/firebase_auth_service";


interface IWithdrawConfirmPopup {
  fbAuth: FbAuth;
  user: User | null;
  setIsOpenWithdrawPopup: (v: boolean) => void;
}

const WithdrawConfirmPopup = ( { fbAuth, user, setIsOpenWithdrawPopup} : IWithdrawConfirmPopup ) => {

  // 탈퇴 실행
  const doWithdrawUser = async () => {
    await fbAuth.logOut();
    await fbAuth.withdrawUser();
    await fbAuth.deleteAllMemo();
    await fbAuth.deleteAllTag();
    
    alert("탈퇴 및 데이터 삭제가 완료되었습니다.")
  }

  // 탈퇴 취소
  const cancelWithdraw = () => {
    setIsOpenWithdrawPopup(false)
  }


  return(
    <Popup
      title="회원 탈퇴"
      onClickCancel={ cancelWithdraw}
      onClickDo={() => doWithdrawUser()}
    >
      <Text>
        현재 저장된 모든 메모가 삭제되며, <br />
        데이터 복구가 불가능합니다. <br />
        정말로 탈퇴할까요? <br />
      </Text>
    </Popup>
  )
}

export default WithdrawConfirmPopup;