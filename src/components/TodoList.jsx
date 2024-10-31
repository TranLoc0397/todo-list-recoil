import React, { useEffect, useState } from "react";
import { Button, Card, Checkbox, List, Progress } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todoListState, todoItemInfo } from "../state/atom";
import TodoForm from "./TodoForm";
import FilterForm from "./FilterForm";
import { filteredTodoListState, todoListStatsState } from "../state/selector";
import { DB } from "../db-connect/firebase";
import firebase from "firebase";

const TodoList = () => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false)
  const todoListFilter = useRecoilValue(filteredTodoListState);
  const setTodoList = useSetRecoilState(todoListState);
  const setTodoInfo = useSetRecoilState(todoItemInfo);
  const { percentCompleted } = useRecoilValue(todoListStatsState);

  useEffect(() => {
    const getData = async () => {
    
      DB.collection("todos")
        .orderBy("time", "desc")
        .onSnapshot((snapshot) => {
          setTodoList(snapshot.docs.map((doc) => {
            let info =  doc.data()
            return {
              id: doc.id,
              ...info
            }
          }));
        });
        setLoading(false)
    };
    setLoading(true)
    getData();
  }, []);

  const handleRemove = (todo) => {
    DB.collection('todos').doc(todo.id).delete();
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
    DB.collection('todos').doc(item.id).set(
      {
        ...item, 
        isComplete: !item.isComplete,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    )
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
        loading={loading}
        header={<div>List</div>}
        itemLayout="horizontal"
        pagination={{
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
export default TodoList;