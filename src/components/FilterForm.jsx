import { Radio, Space } from "antd";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { todoListFilterState } from "../state/atom";
import { todoListStatsState } from "../state/selector";

export default function FilterForm() {
    const [filterValue, setFilterValue] = useRecoilState(todoListFilterState)
    const { totalNum, totalCompletedNum, totalUncompletedNum } =
    useRecoilValue(todoListStatsState);
    const onChange = (e) => {
        setFilterValue(e.target.value);
      };
  return (
    <div>
      <Radio.Group onChange={onChange} value={filterValue}>
        <Space direction='horizontal'>
          <Radio value="all">All ({totalNum})</Radio>
          <Radio value="completed">Completed ({totalCompletedNum})</Radio>
          <Radio value="todo">To do ({totalUncompletedNum})</Radio>
        </Space>
      </Radio.Group>
    </div>
  );
}
