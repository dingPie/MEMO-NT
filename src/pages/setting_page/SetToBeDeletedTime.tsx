import React from "react";

import { CustomBtn } from "../../components/Buttons";
import { ColBox, RowBox } from "../../components/FlexBox";
import Select from "../../components/Select";
import Text from "../../components/Text";

interface ISetToBeDeletedTime {
  onClickSetDeleteTimeBtn: () => void;
  toBeDeleteTime: number;
  onChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}


const SetToBeDeletedTime = ( { onClickSetDeleteTimeBtn, toBeDeleteTime, onChangeSelect }: ISetToBeDeletedTime ) => {



  return(
    <ColBox 
      padding="1rem .5rem" 
      gap={.5}
    >
      <RowBox 
        between align="center" 
        padding="0 .5rem"
      >
        <Text bold fontSize='xl'>
          자동삭제 시간설정
        </Text>
        <CustomBtn
          color="white"
          bgColor="#679BFF"
          padding=".25rem 1rem"
          height={2}
          onClick={onClickSetDeleteTimeBtn}
        >
          시간저장
        </CustomBtn>
      </RowBox>

      <RowBox 
        align="center" 
        gap={.125} 
        padding="0 .5rem"
      >
        <Text padding=".25rem">
          매일
        </Text>
        <Select
          options={timeOption}
          value={toBeDeleteTime}
          onChange={onChangeSelect}
        />
        <Text padding=".25rem">
          삭제예정 메모가 제거됩니다.
        </Text>
      </RowBox>
      
      <Text bold fontSize="s">
        삭제 처리동안 메모 이용이 불가능 합니다. <br />
        이용이 적은 시간대로 설정해 주세요.
      </Text>

    </ColBox>
  )
}

export default SetToBeDeletedTime;

const timeOption = [
  {
    name: "AM 2:00",
    state: 2
  },
  {
    name: "AM 3:00",
    state: 3
  },
  {
    name: "AM 4:00",
    state: 4
  },
  {
    name: "AM 5:00",
    state: 5
  },
  {
    name: "AM 6:00",
    state: 6
  },
  {
    name: "AM 7:00",
    state: 7
  }


  ,
  {
    name: "PM 12:00",
    state: 12
  }
]