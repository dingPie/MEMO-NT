import React, { useCallback, useEffect, useState } from "react";

import { FbMemo } from "../../../firebase/firestore_memo_service";
import { FbTag } from "../../../firebase/firestore_tag_service";

import { IMemo, ITag } from "../../../utils/interface/interface";
import {
  getTagWithMemo,
  getTagWithTagName,
  focusLastMemo,
} from "../utils/talk_service";
import useStore from "../../../store/useStore";

import TalkInput from "./TalkInput";
import TalkEditTagName from "./TalkEditTagName";
import TalkInputOption from "./TalkInputOption";

interface ITalkInpuContainer {
  fbMemo: FbMemo;
  fbTag: FbTag;
  tags: ITag[];
  talkBoxRef: React.RefObject<HTMLDivElement>;
  editMemo: IMemo | null;
  viewMemo: IMemo[];
  setEditMemo: (v: IMemo | null) => void;
  setViewMemo: (v: IMemo[]) => void;
  setToBeDeleteTag: (tagId: string) => void;
}

const TalkInpuContainer = ({
  fbMemo,
  fbTag,
  tags,
  talkBoxRef,
  editMemo,
  viewMemo,
  setEditMemo,
  setViewMemo,
  setToBeDeleteTag,
}: ITalkInpuContainer) => {
  const { loading } = useStore();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const [inputMemo, setInputMemo] = useState<string>(""); // 입력중인 memo
  const [editTagName, setEditTagName] = useState<string>("");
  const [recommTag, setRecommTag] = useState<ITag | null>(null); // 첫 state를 빈 undefined 값이 아닌 null 설정하여 매번 초기화

  const [isMobile, setIsMobile] = useState(false); // 모바일여부

  // 모바일인지 체크하여 엔터 이벤트 넣어줌
  useEffect(() => {
    const isMobile = () =>
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    setIsMobile(isMobile());
  }, []);

  // editmemo 설정시 tagName , content input state 설정
  useEffect(() => {
    if (!editMemo) return;
    setInputMemo(editMemo.content);
    const tagName =
      editMemo.tagId === "undefined" ? "" : getTagWithMemo(tags, editMemo).name;
    onChangeTagName(null, tagName);
    if (inputRef.current) inputRef.current.focus();
  }, [editMemo]);

  // editmemo 취소
  const onClickCancelEditMemo = useCallback(() => {
    setEditMemo(null);
    setInputMemo("");
  }, []);

  // 수정할 tagName state 관리
  const onChangeTagName = (
    e?: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | null,
    tagName?: string,
  ) => {
    if (e) setEditTagName(e.target.value);
    else if (tagName !== undefined) setEditTagName(tagName);
  };

  //input memo가 바뀔때마다 실행되는 로직 -> input창 크기감지 / 추천 검색어 표시
  const onChangeInputMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    const tagName = value.split("#")[1];
    if (tagName) {
      const recommandTag = tags.filter(v => v.name.includes(tagName));
      setRecommTag(recommandTag[0]);
    }
    setInputMemo(value);
  };

  // 태그 input 버튼 클릭 => editMemo 유무에 따라 edit or add 로직 발생
  const onClickInputBtn = async () => {
    if (!inputMemo) return;
    loading.start();
    // 메모 수정
    if (editMemo) {
      const newTag = await doEditTag(editMemo); // 태그 데이터 수정 (수정할 메모와 관련된 태그데이터 수정)
      await doEditMemo(editMemo, inputMemo); // 메모 데이터 수정

      const editedMemo: IMemo = {
        // 메모(태그) state 수정
        ...editMemo,
        tagId: newTag.id,
        content: inputMemo,
      };
      const newViewMemo = viewMemo.map(v =>
        v.id === editMemo.id ? editedMemo : v,
      );
      setViewMemo(newViewMemo);
      setEditMemo(null);
    }
    // 메모 추가
    else {
      const newMemo = (await doAddMemo(inputMemo)) as IMemo; // 메모 데이터 추가
      setViewMemo([...viewMemo, newMemo]); // 메모 state 추가
      focusLastMemo(talkBoxRef); // 추가한 메모 보기
    }
    loading.finish();
    setInputMemo(""); // 이건 둘 다 실행되어야 함.
  };

  // 엔터 이벤트 추가
  const onEnterInputEvent = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (isMobile) return;
    const { key, shiftKey } = e;
    if (!shiftKey && key === "Enter") {
      await onClickInputBtn();
    }
  };

  // 메모 수정시 태그 수정
  const doEditTag = async (editMemo: IMemo) => {
    const targetTag = getTagWithMemo(tags, editMemo); // 현재 메모의 태그 정보
    if (targetTag.name === editTagName) return targetTag; // 태그이름이 수정되지 않았으면 리턴

    let newTag = getTagWithTagName(tags, editTagName); // 이름이 같은 태그가 존재하는지 검사
    if (!newTag) newTag = (await fbTag.addTag(editTagName)) as ITag; // 현재 태그가 태그목록에서 없으면 새 태그 생성

    await fbMemo.editMemoUsedTag(editMemo.id, newTag.id); // 현재 메모의 태그 아이디를 수정해주고
    await fbTag.addUsedMemo(newTag.id, editMemo.id); // 존재하던 태그에 수정한 메모 id 넣어주고
    await fbTag.deleteUsedMemo(editMemo); // 현재 태그에서 editMemo에서 현재 메모 아이디 빼주고

    // 빈 태그 삭제 지정
    if (editMemo.tagId === "toBeDeleted" || editMemo.tagId === "undefined") {
      console.log("undefiend / toBeDeleted 태그 자체는 삭제되지 않습니다.");
    } else {
      const usedMemoLength = await fbTag.checkUsedMemoLength(editMemo!.tagId);
      if (!usedMemoLength) setToBeDeleteTag(editMemo!.tagId);
    }

    return newTag;
  };

  // 메모 수정시 메모 수정
  const doEditMemo = async (editMemo: IMemo, inputMemo: string) => {
    if (editMemo.content === inputMemo) return;
    fbMemo.editMemoContent(editMemo.id, inputMemo);
  };

  // 메모 추가시
  const doAddMemo = async (inputMemo: string) => {
    loading.start();
    const target = inputMemo.split("#");
    const content = target[0];
    let tagName = target[1];
    if (tagName === "") tagName = "undefined";
    else if (tagName === undefined) tagName = "toBeDeleted";

    let newTag = getTagWithTagName(tags, tagName);
    if (!newTag) newTag = (await fbTag.addTag(tagName)) as ITag; // 현재 태그가 태그목록에서 없으면 새 태그 생성

    const newMemo = await fbMemo.addMemo(newTag.id, content); // 메모 추가하고
    fbTag.addUsedMemo(newTag.id, newMemo!.id); // 사용한 태그에 현재 메모 로그를 추가해준다.
    loading.finish();
    return newMemo;
  };

  // 태그 옵션버튼 클릭 => 태그 input창에 바로 추가
  const onClickTagOption = (tagName?: string) => {
    let result;
    if (inputMemo.includes("#"))
      result = inputMemo.split("#")[0] + "#" + tagName;
    else result = inputMemo + " #" + tagName;
    setInputMemo(result);
    if (inputRef.current) inputRef.current.focus(); // 옵션 클릭시 input창 focus()
  };

  return (
    <>
      {/* 태그 추천관련 */}
      {inputMemo && !editMemo && (
        <TalkInputOption
          tags={tags}
          recommTag={recommTag}
          onClickTagOption={onClickTagOption}
        />
      )}
      {/* 메모 수정시 나오는 옵션 */}
      {editMemo && (
        <>
          <TalkEditTagName
            tags={tags}
            editMemo={editMemo}
            onClickCancelEditMemo={onClickCancelEditMemo}
            editTagName={editTagName}
            onChangeTagName={onChangeTagName}
          />
        </>
      )}
      {/*  기본 인풋창  */}
      <TalkInput
        inputRef={inputRef}
        value={inputMemo}
        onChangeInputMemo={e => onChangeInputMemo(e)}
        onClickInputBtn={onClickInputBtn}
        onEnterInputEvent={onEnterInputEvent}
      />
    </>
  );
};

export default TalkInpuContainer;
