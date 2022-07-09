import { User } from "firebase/auth";
import React from "react";

import Popup from "../../components/Popup";
import Text from "../../components/Text";
import { FbAuth } from "../../firebase/firebase_auth_service";
import { FbMemo } from "../../firebase/firestore_memo_service";
import { FbTag } from "../../firebase/firestore_tag_service";
import useStore from "../../store/useStore";
import { IMemo } from "../../utils/interface/interface";

interface ITalkDeletePopup {
  fbAuth: FbAuth
  fbMemo: FbMemo;
  fbTag: FbTag;
  viewMemo: IMemo[];
  setViewMemo: (memoArr: IMemo[]) => void;
  selectedMemo: IMemo | null;
  setSelectedMemo:(memo: IMemo | null) => void;
  pinnedMemo: IMemo | null;
  setIsOpenDeletePopup: (v: boolean) => void;
}

const TalkDeletePopup = ( {fbAuth, fbMemo, fbTag,  viewMemo, setViewMemo , selectedMemo, setSelectedMemo, pinnedMemo, setIsOpenDeletePopup }: ITalkDeletePopup ) => {

  const { loading } = useStore();

  const deleteMemo = async () => {
    loading.start();
    await fbMemo.deleteMemo(selectedMemo!.id)
    await fbTag.deleteUsedMemo(selectedMemo!)
    const newViewMemo = viewMemo.filter(memo => memo.id !== selectedMemo!.id);
    
    // 핀 삭제
    if ( pinnedMemo && selectedMemo!.id === pinnedMemo!.id) await fbAuth.setPinnedMemo('')
    loading.finish();
    
    setViewMemo(newViewMemo);
    setSelectedMemo(null);
    setIsOpenDeletePopup(false);
    
    // 태그 삭제
    const usedMemoLength = await fbTag.checkUsedMemoLength(selectedMemo!.tagId);
    if (!usedMemoLength) await fbTag.deleteTag(selectedMemo!.tagId);
  }

  const onClickCanlcelBtn = () => setIsOpenDeletePopup(false)

  return(
    <Popup
      title="메모 삭제"
      onClickCancel={onClickCanlcelBtn}
      onClickDo={deleteMemo}
    >
      <Text>
        이 메모를 삭제할까요?
      </Text>
    </Popup>
  )
}

export default TalkDeletePopup;