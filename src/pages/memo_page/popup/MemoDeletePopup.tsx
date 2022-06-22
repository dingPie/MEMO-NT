import React from "react";
import Popup from "../../../components/Popup";
import Text from "../../../components/Text";

interface IMemoDeletePopup {
  onClickCancel?: () => void;
  onClickDo?: () => void;
}

const MemoDeletePopup = ( { onClickCancel, onClickDo }: IMemoDeletePopup ) => {


  return(
    <Popup
      title="태그 삭제"
      onClickCancel={onClickCancel}
      onClickDo={onClickDo}
    >
      <Text>
        이 태그를 삭제할까요?
      </Text>
    </Popup>
  )
}

export default MemoDeletePopup;