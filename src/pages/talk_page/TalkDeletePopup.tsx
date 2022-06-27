import React from "react";

import Popup from "../../components/Popup";
import Text from "../../components/Text";

interface ITalkDeletePopup {
  onClickCancel: () => void;
  onClickDo: () => void;
}

const TalkDeletePopup = ( { onClickCancel, onClickDo }: ITalkDeletePopup ) => {


  return(
    <Popup
      title="메모 삭제"
      onClickCancel={onClickCancel}
      onClickDo={onClickDo}
    >
      <Text>
        이 메모를 삭제할까요?
      </Text>
    </Popup>
  )
}

export default TalkDeletePopup;