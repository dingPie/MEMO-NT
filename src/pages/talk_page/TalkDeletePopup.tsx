import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";

import Popup from "../../components/Popup";
import Text from "../../components/Text";
import { FbAuth } from "../../firebase/firebase_auth_service";
import { FbMemo } from "../../firebase/firestore_memo_service";
import { FbTag } from "../../firebase/firestore_tag_service";
import useStore from "../../store/useStore";
import { IMemo } from "../../utils/interface/interface";

interface ITalkDeletePopup {
  fbMemo: FbMemo;
  fbTag: FbTag;
  fbAuth: FbAuth;
  viewMemo: IMemo[];
  selectedMemo: IMemo | null;
  pinnedMemo: IMemo | null;
  setViewMemo: (memoArr: IMemo[]) => void;
  setSelectedMemo: (memo: IMemo | null) => void;
  setIsOpenDeletePopup: (v: boolean) => void;
  setToBeDeleteTag: (v: string) => void;
}

const TalkDeletePopup = ({
  fbMemo,
  fbTag,
  fbAuth,
  viewMemo,
  selectedMemo,
  pinnedMemo,
  setViewMemo,
  setSelectedMemo,
  setIsOpenDeletePopup,
  setToBeDeleteTag,
}: ITalkDeletePopup) => {
  const { loading } = useStore();

  useEffect(() => {
    return () => {
      loading.isLoading && loading.finish();
    };
  }, []);

  const deleteMemo = async () => {
    loading.start();
    await fbMemo.deleteMemo(selectedMemo!.id);
    await fbTag.deleteUsedMemo(selectedMemo!);
    const newViewMemo = viewMemo.filter(memo => memo.id !== selectedMemo!.id);

    // 핀 삭제
    if (pinnedMemo && selectedMemo!.id === pinnedMemo!.id)
      await fbAuth.setPinnedMemo("");
    // 빈 태그 삭제
    if (
      selectedMemo!.tagId === "undefined" ||
      selectedMemo!.tagId === "toBeDeleted"
    ) {
      console.log("해당 태그는 빈 태그지만, 삭제되지 않습니다.");
    } else {
      const usedMemoLength = await fbTag.checkUsedMemoLength(
        selectedMemo!.tagId,
      );
      if (!usedMemoLength) setToBeDeleteTag(selectedMemo!.tagId);
    }
    loading.finish();
    setViewMemo(newViewMemo);
    setSelectedMemo(null);
    setIsOpenDeletePopup(false);
  };

  // 취소버튼 클릭
  const onClickCanlcelBtn = () => setIsOpenDeletePopup(false);

  return (
    <Popup
      title="메모 삭제"
      onClickCancel={onClickCanlcelBtn}
      onClickDo={deleteMemo}
    >
      <Text>이 메모를 삭제할까요?</Text>
    </Popup>
  );
};

export default TalkDeletePopup;
