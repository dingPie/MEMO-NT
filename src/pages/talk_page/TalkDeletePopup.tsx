import React from "react";
import Popup from "../../components/Popup";
import Text from "../../components/Text";
import { IMemo } from "../../utils/interface/interface";

interface ITalkDeletePopup {
  selectedMemo: IMemo | null;
  onClickCancel: () => void;
  onClickDo: (v: IMemo) => void;
}

const TalkDeletePopup = ( { selectedMemo, onClickCancel, onClickDo }: ITalkDeletePopup ) => {

  return(
    <Popup
      title="메모 삭제"
      onClickCancel={onClickCancel}
      onClickDo={() => onClickDo(selectedMemo!)}
    >
      <Text>
        이 메모를 삭제할까요?
      </Text>
    </Popup>
  )
}

export default TalkDeletePopup;