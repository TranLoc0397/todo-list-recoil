import React from "react";
import { Button, Card, Checkbox, List, Progress } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { todoListState, todoItemInfo } from "../state/atom";
import TodoForm from "./TodoForm";
import { removeItemAtIndex, replaceItemAtIndex } from "../common/function";
import FilterForm from "./FilterForm";
import { filteredTodoListState, todoListStatsState } from "../state/selector";

export default function TodoList() {
  const [open, setOpen] = React.useState(false);
  const todoListFilter = useRecoilValue(filteredTodoListState);
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const setTodoInfo = useSetRecoilState(todoItemInfo);
  const { percentCompleted } = useRecoilValue(todoListStatsState);

  const handleRemove = (item) => {
    let index = todoList.findIndex((value) => item.id === value.id);
    const newList = removeItemAtIndex(todoList, index);
    setTodoList(newList);
  };

  const handleCloseModal = () => {
    setTodoInfo((state) => {
      return {
        title: "",
        description: "",
        type: "add",
      };
    });
    setOpen(false);
  };

  const handleCompleted = (item) => {
    let list = JSON.parse(JSON.stringify(todoList));
    let index = list.findIndex((value) => item.id === value.id);
    let newArr = replaceItemAtIndex(list, index, {
      ...item,
      isComplete: !item.isComplete,
    });
    setTodoList(() => newArr);
  };

  return (
    <Card
      bodyStyle={{ padding: "10px" }}
      title="TO DO LIST"
      extra={
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => setOpen(true)}
        >
          Add
        </Button>
      }
    >
      <FilterForm />
      <Progress percent={percentCompleted.toFixed(0)} />
      <List
        header={<div>List</div>}
        itemLayout="horizontal"
        pagination={{
          // hideOnSinglePage: true,
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={todoListFilter}
        renderItem={(item, index) => (
          <List.Item
            key={index}
            actions={[
              <Button
                disabled={item.isComplete}
                type="primary"
                shape="circle"
                onClick={() => {
                  setOpen(true);
                  setTodoInfo((state) => {
                    return {
                      ...item,
                      type: "edit",
                    };
                  });
                }}
                icon={<EditOutlined />}
              />,
              <Button
                type="primary"
                danger
                shape="circle"
                onClick={() => handleRemove(item)}
                icon={<DeleteOutlined />}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Checkbox
                  checked={item.isComplete}
                  onChange={() => handleCompleted(item)}
                />
              }
              title={
                <span
                  className={
                    item.isComplete ? "completed-item" : "not-completed"
                  }
                >
                  {item.title}
                </span>
              }
              description={item.description}
            />
          </List.Item>
        )}
      />
      <TodoForm open={open} handleCloseModal={handleCloseModal} />
    </Card>
  );
}
