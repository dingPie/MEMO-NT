import React from "react";
import Popup from "../../components/Popup";
import Text from "../../components/Text";

interface IMemoDeleteConfirmPopup {
  onClickCancel: () => void;
  onClickDo: () => void;
}

const MemoDeleteConfirmPopup = ( { onClickCancel, onClickDo }: IMemoDeleteConfirmPopup ) => {

  return(
    <Popup
      title="태그 삭제"
      onClickCancel={onClickCancel}
      onClickDo={onClickDo}
      cancelBtnName="아니요"
      doBtnName="예"
    >
      <Text size="s">
        이 태그의 메모까지 전부 삭제할까요? <br />
        아니요 클릭시, 태그만 삭제되며 메모들은 지정된 태그만 사라집니다.
      </Text>
    </Popup>
  )
}

export default MemoDeleteConfirmPopup;