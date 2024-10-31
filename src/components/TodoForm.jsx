import React from "react";
import { Form, Input, Modal } from "antd";
import { useRecoilState } from "recoil";
import { todoItemInfo } from "../state/atom";
import { DB } from "../db-connect/firebase";
import firebase from "firebase";

export default function TodoForm({ open, handleCloseModal }) {
  const [itemInfo] = useRecoilState(todoItemInfo);
  const [form] = Form.useForm();
  form.setFieldsValue({ ...itemInfo });
  const toDate = () => {
    let date = new Date();
    const today = date.toDateString();
    return today;
  };

  const handelSubmit = (values) => {
    if (itemInfo?.type !== "add") {
      DB.collection('todos').doc(itemInfo.id).set(
        {
          ...itemInfo, 
          ...values,
          time: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    } else {
      let newItem = {
        time: firebase.firestore.FieldValue.serverTimestamp(),
        date: toDate(),
        title: values.title,
        description: values.description,
        isComplete: false,
      }
      DB.collection('todos').add(newItem);
    }
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
