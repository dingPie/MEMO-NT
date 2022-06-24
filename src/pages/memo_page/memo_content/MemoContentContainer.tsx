import  React, { useState } from "react";
import styled from "styled-components";
import { CustomBtn } from "../../../components/Buttons";
import { ColBox } from "../../../components/FlexBox";

import Text from "../../../components/Text";
import { FbMemo } from "../../../firebase/firestore_memo_service";
import { FbTag } from "../../../firebase/firestore_tag_service";
import { IMemo, ITag } from "../../../utils/interface/interface";
import { IEditMemo, MemoProps } from "../MemoPage";
import MemoContent from "./MemoContent";
import MemoInputAdd from "./MemoInputAdd";
import MemoInputEdit from "./MemoInputEdit";

interface IMemoContentContainer extends MemoProps {
  // memo: IMemo;
  memoList: IMemo[];
  setMemoList: (memo: IMemo[]) => void;
}

const MemoContentContainer = ( { fbTag, fbMemo, tag, memoList, setMemoList }: IMemoContentContainer ) => {

  const [isOpenInputMemo, setIsOpenInputMemo] = useState(false);
  const [inputMemo, setInputMemo] = useState("");
  const [editMemo, setEditMemo] = useState<IEditMemo | null>(null)

  //버튼 클릭
  const onClickAddMemoBtn = () => {
    setIsOpenInputMemo(true)
  }

  // 메모 추가 확인
  const onClickAddConfirm = async (tagId: string, inputMemo: string) => {
    const newMemo = await fbMemo.addMemo(tagId, inputMemo);
    fbTag.addUsedMemo(tagId, newMemo!.id)

    setMemoList([...memoList, newMemo!])
    setIsOpenInputMemo(false)
    setInputMemo("")
  }

  // 메모 추가 취소
  const onClickAddCancel = () => {
    setIsOpenInputMemo(false)
    setInputMemo("")
  }


  //내용 수정
  const onChangeInputMemo = (e: React.ChangeEvent<HTMLTextAreaElement> ) => {
    setInputMemo(e.target.value)
  }

  // 메모 클릭 => 수정 input창 출력
  const onClickMemo = (e: React.MouseEvent<HTMLDivElement>, memo: IMemo) => {
    const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
    e.currentTarget.offsetTop
    const newEditMemo = {
      memo: memo,
      x: x,
      y: y,
      width: width,
      height: height
    }
    setInputMemo(memo.content )
    setEditMemo(newEditMemo)
  }

  // 수정 실행 (종료)
  const onClickDoEditMemo = async (editMemo: IEditMemo, inputMemo: string) => {
    setInputMemo("")
    setEditMemo(null)
    if (inputMemo === editMemo!.memo.content) return
     
    await fbMemo.editMemoContent(editMemo.memo.id, inputMemo);

    const editedMemo: IMemo = {  // 메모(태그) state 수정
      ...editMemo.memo,
      content: inputMemo
    }
    const newMemoList = memoList.map(memo => (memo.id === editMemo.memo.id) ? editedMemo : memo)
    setMemoList(newMemoList);
  }

  // 메모 삭제 로직
  const onClickDoDeleteMemo = async (e: React.MouseEvent<HTMLDivElement>, editMemo: IEditMemo) => {
    const confirm = window.confirm("이 메모를 삭제할까요?")
    setEditMemo(null)
    if (!confirm) return
    await fbMemo.deleteMemo(editMemo.memo!.id)
    await fbTag.deleteUsedMemo(editMemo.memo!)
    // await fbTag.deleteTag(selectedMemo.tagId) // 태그 삭제 관련은 고민해야함

    const newViewMemo = memoList.filter(memo => memo.id !== editMemo.memo.id );
    setMemoList(newViewMemo);
  }



  return(
      <>
        <ColBox gap={.25} padding="0" >
          { memoList.map( (memo, id) => {
            return(
              <MemoContent
                key={id}
                memo={memo}
                onClickMemo={(e) => onClickMemo(e, memo)} 
              />
            )
          })}
        </ColBox>

        {/* 메모 추가 */}
        { isOpenInputMemo &&
          <MemoInputAdd
            tag={tag}
            inputMemo={inputMemo}
            onChangeInputMemo={onChangeInputMemo}
            onClickAddConfirm={onClickAddConfirm}
            onClickAddCancel={onClickAddCancel}
          /> 
        }
        { !isOpenInputMemo &&
          <CustomBtn
            size="s"
            bgColor="#dddddd"
            onClick={onClickAddMemoBtn}
          >
            메모 추가
          </CustomBtn>
        }

        { editMemo &&
          <MemoInputEdit 
            editMemo={editMemo}
            inputMemo={inputMemo}
            onChangeInputMemo={onChangeInputMemo}
            onClickDoEditMemo={onClickDoEditMemo}
            onClickDoDeleteMemo={onClickDoDeleteMemo}
          />
        }

      </>
  )
}

export default MemoContentContainer;