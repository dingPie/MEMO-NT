import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import useStore from "../../../store/useStore";

import { CustomBtn } from "../../../components/Buttons";

import { FbAuth } from "../../../firebase/firebase_auth_service";
import { IMemo, IUserInfo } from "../../../utils/interface/interface";

// Memo Components
import { MemoProps } from "../MemoPage";
import MemoInputAdd from "./MemoInputAdd";

interface IMemoAddContainer extends MemoProps {
  memoList: IMemo[];
  isOpenMenu: boolean;
  isOpenInputMemo: boolean;
  isOpenEditTag: boolean;
  setMemoList: (memo: IMemo[]) => void;
  setIsOpenInputMemo: (v: boolean) => void;
}

const MemoAddContainer = ({
  fbTag,
  fbMemo,
  tag,
  memoList,
  isOpenMenu,
  isOpenEditTag,
  isOpenInputMemo,
  setMemoList,
  setIsOpenInputMemo,
}: IMemoAddContainer) => {
  const { loading } = useStore();
  const [inputMemo, setInputMemo] = useState("");

  const [isMobile, setIsMobile] = useState(false); // 모바일여부

  // 모바일인지 체크하여 엔터 이벤트 넣어줌
  useEffect(() => {
    const isMobile = () =>
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    console.log("감지결과 확인", isMobile());
    setIsMobile(isMobile());
  }, []);

  // 추가하기 버튼 클릭
  const onClickAddMemoBtn = useCallback(() => {
    if (isOpenMenu || isOpenEditTag) return;
    setIsOpenInputMemo(true);
  }, [isOpenMenu, isOpenInputMemo]);

  // 메모 추가 확인
  const onClickAddConfirm = useCallback(
    async (tagId: string, inputMemo: string) => {
      loading.start();
      const newMemo = await fbMemo.addMemo(tagId, inputMemo);
      fbTag.addUsedMemo(tagId, newMemo!.id);

      setMemoList([...memoList, newMemo!]);
      setIsOpenInputMemo(false);
      setInputMemo("");
      loading.finish();
    },
    [memoList, loading],
  );

  // 엔터 이벤트 추가
  const onEnterInputEvent = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    tagId: string,
    inputMemo: string,
  ) => {
    if (isMobile) return;
    const { key, shiftKey } = e;
    if (!shiftKey && key === "Enter") {
      await onClickAddConfirm(tagId, inputMemo);
    }
  };

  // 메모 추가 취소
  const onClickAddCancel = useCallback(() => {
    setIsOpenInputMemo(false);
    setInputMemo("");
  }, [isOpenInputMemo, inputMemo]);

  //내용 수정
  const onChangeInputMemo = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputMemo(e.target.value);
    },
    [inputMemo],
  );

  return (
    <>
      {/* 메모 추가 */}
      {isOpenInputMemo && (
        <MemoInputAdd
          tag={tag}
          inputMemo={inputMemo}
          onChangeInputMemo={onChangeInputMemo}
          onClickAddConfirm={onClickAddConfirm}
          onClickAddCancel={onClickAddCancel}
          onEnterInputEvent={onEnterInputEvent}
        />
      )}
      {!isOpenInputMemo && (
        <CustomBtn fontSize="s" bgColor="#dddddd" onClick={onClickAddMemoBtn}>
          메모 추가
        </CustomBtn>
      )}
    </>
  );
};

export default memo(MemoAddContainer);
