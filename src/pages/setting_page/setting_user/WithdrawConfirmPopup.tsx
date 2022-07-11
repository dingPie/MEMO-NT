import React, { useRef } from "react";
import { User } from "firebase/auth";

import Popup from "../../../components/Popup";
import Text from "../../../components/Text";
import { FbAuth } from "../../../firebase/firebase_auth_service";
import InputText from "../../../components/InputText";
import { ColBox } from "../../../components/FlexBox";


interface IWithdrawConfirmPopup {
  fbAuth: FbAuth;
  user: User | null;
  setIsOpenWithdrawPopup: (v: boolean) => void;
}

const WithdrawConfirmPopup = ( { fbAuth, user, setIsOpenWithdrawPopup} : IWithdrawConfirmPopup ) => {

  const confrimTextRef = useRef<HTMLTextAreaElement>(null)

  // 탈퇴 실행
  const doWithdrawUser = async () => {
    if (confrimTextRef.current!.value !== "확인하였습니다") {
      alert("올바른 확인 메세지를 입력해주세요")
      setIsOpenWithdrawPopup(false)
      return
    }
    await fbAuth.withdrawUser();
    await fbAuth.deleteAllMemo();
    await fbAuth.deleteAllTag();
    await fbAuth.logOut();
    
    alert("탈퇴 및 데이터 삭제가 완료되었습니다.")
  }

  // 탈퇴 취소
  const cancelWithdraw = () => {
    setIsOpenWithdrawPopup(false)
  }


  return(
    <Popup
      gap={.1}
      title="회원 탈퇴"
      onClickCancel={ cancelWithdraw}
      onClickDo={() => doWithdrawUser()}
    >
      <Text>
        현재 저장된 모든 메모가 삭제되며, <br />
        데이터 복구가 불가능합니다. <br />
        정말로 탈퇴할까요? <br />
      </Text>

      <ColBox padding=".5rem" gap={.25}>
        <Text padding="0 .25rem"> 
          탈퇴시 아래 빈 칸에
        </Text>
        <Text bold padding="0 .25rem">
          확인하였습니다
        </Text>
        <Text padding="0 .25rem">
          를 입력해주세요.
        </Text>
        <InputText
          ref={confrimTextRef}
          placeholder="확인하였습니다" 
        />
      </ColBox>
    </Popup>
  )
}

export default WithdrawConfirmPopup;