import React from "react";
import { ColBox, RowBox } from "../../components/FlexBox";
import Select from "../../components/Select";
import Text from "../../components/Text";

const SetBombTime = () => {

  return(
    <ColBox padding="1rem .5rem" gap={1}>
      <Text bold size='xl'>
        자동삭제 시간설정
      </Text>
        <RowBox align="center" gap={.125} padding=" 0" >
          <Text>매일</Text>
          <Select
            options={timeOption}
          />
          <Text padding="0">
            시에 삭제예정 메모가 제거됩니다.
          </Text>
        </RowBox>

      <Text bold size="s">
        삭제 처리동안 메모 이용이 불가능 합니다. <br />
        이용이 적은 시간대로 설정해 주세요.
      </Text>

    </ColBox>
  )
}

export default SetBombTime;

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
]