import React from 'react';
import {Modal, Form, Input, Button, message} from 'antd';

const CreateEditUser: React.FC<{}> = (props: any) => {

  const {isModalVisible, handleCancel, reloadTable, row} = props;

  const onFinish = (values: any) => {
    console.log('Success:', values);
    const {dispatch} = props;
    let formValues = {};
    if (row) {
      formValues = {...values, id: row.id}
    }
    dispatch({
      type: 'system/createUser',
      payload: formValues,
      callback: (res: any) => {
        message.success(res.message)
        handleCancel(false)
        reloadTable()
      }
    })
  };

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 10, span: 6 },
  };
  return (
    <Modal
      title={row.id? "编辑" :"新增"}
      visible={isModalVisible}
      onCancel={() => handleCancel(false)}
      footer={false}
    >
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        initialValues={row}
      >
        <Form.Item
          label="用户名"
          name="userName"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input disabled={row.id} />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ required: true, message: '请输入邮箱!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
      </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateEditUser;
