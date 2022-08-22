import React from "react";

import Popup from "../../../components/Popup";
import Text from "../../../components/Text";

interface IMemoDeletePopup {
  onClickCancelDelete: () => void;
  onClickDoDelete: () => void;
}

const MemoDeletePopup = ({
  onClickCancelDelete,
  onClickDoDelete,
}: IMemoDeletePopup) => {
  return (
    <Popup
      title="태그 삭제"
      onClickCancel={onClickCancelDelete}
      onClickDo={onClickDoDelete}
    >
      <Text>이 태그를 삭제할까요?</Text>
    </Popup>
  );
};

export default MemoDeletePopup;
