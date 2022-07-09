

export const getUndefinedMemo = (time: number) =>  {
  return {
    id: time.toString(),
    tagId: "undefined",
    content: "태그가 지정되지 않은 메모 입니다.", 
    createTime: time
  }
 }

 
 export const getToBeDeletedMemo = (time: number) =>  {
 return {  
    id: time.toString(),
    tagId: "toBeDeleted",
    content: "내일이면 삭제 될 메모 입니다.", 
    createTime: time
  }
}

export const getInitMenualMemo = (time: number) => {
  return [
    {
     id: time.toString(),
     tagId: "initMenual",
     content: `메모 입력시, 내용 뒤에 해시태그와 내용을 입력하면 태그로 지정이 됩니다. 해당 메모들은 오른쪽 위 상자 버튼을 통해 "그리드페이지"로 이동되며, 내가 작성한 메모들을 태그별로 모아 볼 수 있습니다.`, 
     createTime: time
   },
   {
     id: (time + 1).toString(),
     tagId: "initMenual",
     content: `해시태그 없이 입력하면 매일 새벽 삭제되는 삭제 예정 메모 해시태그 입력 후 아무런 값 입력이 없으면 태그없음 태그와 내용을 적으면 해당 내용으로 태그가 생성됩니다.`, 
     createTime: (time + 1)
   },
   {
    id: (time + 2).toString(),
    tagId: "initMenual",
    content: `작성한 메모의 오른쪽 ... 버튼 클릭시 \n이렇게\n숨겨진\n내용까지\n확인이\n가능합니다`, 
    createTime: (time + 2)
  },
  {
   id: (time + 3).toString(),
   tagId: "initMenual",
   content: `이렇게 선택한 메모는 언제든지 수정 / 삭제 가능합니다.`, 
   createTime: (time + 3)
  },
    {
    id: (time + 4).toString(),
    tagId: "initMenual",
    content: `그리드 페이지에서 해당 메모 클릭시 일반 메모앱형태의 메모창으로 접근 가능합니다. 여기서도 언제든 메모를 수정하거나 삭제할 수 있습니다. 참고로 현재, 메모 페이지에선 태그수정과 메모수정이 동시에 이루어지지 않습니다.`, 
    createTime: (time + 4)
  },
  {
    id: (time + 5).toString(),
    tagId: "initMenual",
    content: `현재 메모의 태그이름을 클릭하면 이 또한 수정, 삭제. 그리고 색상변경까지 가능합니다. 아래 팔레트에서 원하는 색상을 선택하여 각 태그를 구별해보세요`, 
    createTime: (time + 5)
  },
  {
    id: (time + 6).toString(),
    tagId: "initMenual",
    content: `현재 메모의 태그이름을 클릭하면 이 또한 수정, 삭제. 그리고 색상변경까지 가능합니다. 아래 팔레트에서 원하는 색상을 선택하여 각 태그를 구별해보세요`, 
    createTime: (time + 6)
  },
  {
    id: (time + 7).toString(),
    tagId: "initMenual",
    content: `설정 페이지에서 삭제 예정 시간을 변경 가능합니다. 2시부터 7시 사이 언제든 지정 가능하며, 여러분이 자는 사이 알아서 지워줄거에요.`, 
    createTime: (time + 7)
  }
  ,
  {
    id: (time + 8).toString(),
    tagId: "initMenual",
    content: `개인정보는 따로 수집하지 않습니다. 탈퇴도 언제든 가능합니다. 다만, 탈퇴시 모든 메모 삭제 및 복구가 불가능하니 신중하게 결정해주세요.`, 
    createTime: (time + 8)
  }
 ]
} 
