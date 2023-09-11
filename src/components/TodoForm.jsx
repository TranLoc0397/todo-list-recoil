import React from "react";
import { Form, Input, Modal } from "antd";
import { useRecoilState } from "recoil";
import { todoListState, todoItemInfo } from "../state/atom";
import { replaceItemAtIndex } from "../common/function";

export default function TodoForm({ open, handleCloseModal }) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [itemInfo] = useRecoilState(todoItemInfo);
  const [form] = Form.useForm();
  form.setFieldsValue({ ...itemInfo });

  const handelSubmit = (values) => {
    let list = JSON.parse(JSON.stringify(todoList));
    let newArr = [];
    if (itemInfo?.type !== "add") {
      let index = list.findIndex((value) => itemInfo.id === value.id);
      newArr = replaceItemAtIndex(list, index, { ...itemInfo, ...values });
    } else {
      newArr = [
        ...list,
        {
          id: list[list.length - 1]?.id + 1,
          icon:
            "https://xsgames.co/randomusers/avatar.php?g=pixel&key=" +
            list[list.length - 1]?.id +
            1,
          title: values.title,
          description: values.description,
          isComplete: false,
        },
      ];
    }
    setTodoList(() => newArr);
    handleCloseModal();
  };

  return (
    <Modal
      title="TO DO ITEM"
      destroyOnClose={true}
      open={open}
      okText="Save"
      cancelText="Cancel"
      onCancel={handleCloseModal}
      onClose={handleCloseModal}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        name="todo-list"
        labelAlign="left"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        onFinish={handelSubmit}
      >
        <Form.Item
          label="Title"
          className="mb-0"
          name="title"
          rules={[{ required: "true" }]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item label="Description" className="mb-0" name="description">
          <Input.TextArea rows={8} placeholder="Description" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
