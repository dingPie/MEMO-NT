export const undefinedTag = {
  name: "undefined",
  color: "0",
  usedMemo: [],
  lastUpdate: 0,
};

export const tobeDeletedTag = {
  name: "toBeDeleted",
  color: "1",
  usedMemo: [],
  lastUpdate: 0,
};

export const initMenualTag = {
  name: "매뉴얼",
  color: "2",
  usedMemo: [],
  lastUpdate: 0,
};

export const getUndefinedMemo = (time: number) => {
  return {
    id: time.toString(),
    tagId: "undefined",
    content: "태그가 지정되지 않은 메모 입니다.",
    createTime: time,
  };
};

export const getToBeDeletedMemo = (time: number) => {
  return {
    id: time.toString(),
    tagId: "toBeDeleted",
    content: "내일이면 삭제 될 메모 입니다.",
    createTime: time,
  };
};

export const getInitMenualMemo = (time: number) => {
  return [
    {
      id: time.toString(),
      tagId: "initMenual",
      content: `메모 입력시, 내용 뒤에 해시태그와 내용을 입력하면 태그로 지정이 됩니다. 작성한 메모들은 태그별로 모아 볼 수 있습니다.`,
      createTime: time,
    },
    {
      id: (time + 1).toString(),
      tagId: "initMenual",
      content: `해시태그 없이 입력하면 매일 새벽 삭제되는 삭제 예정 메모가 생성됩니다. 해시태그 입력 후 아무런 값 입력이 없으면 태그없음 메모가 생성됩니다.`,
      createTime: time + 1,
    },
    {
      id: (time + 2).toString(),
      tagId: "initMenual",
      content: `태그별로 모인 메모들은 좀 더 메모장처럼 추가, 수정, 삭제가 가능합니다. 또한 언제든지 태그 이름을 변경하고 색상을 변경하여 나만의 태그를 관리하세요`,
      createTime: time + 2,
    },
    {
      id: (time + 3).toString(),
      tagId: "initMenual",
      content: `개인정보는 따로 수집되지 않으며, 언제든 탈퇴가 가능합니다. 다만, 탈퇴시 모든 메모 삭제 및 복구가 불가능함을 유의해주세요.`,
      createTime: time + 3,
    },
  ];
};
