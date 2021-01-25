import React from 'react';
import {Modal, Form, Input, Button, message} from 'antd';

const CreateEditMenu: React.FC<{}> = (props: any) => {

  const {isModalVisible, handleCancel, reloadTable, row, child} = props;

  const onFinish = (values: any) => {
    console.log('Success:', values);
    const {dispatch} = props;
    let formValues = {};
    if (row && !child) {
      formValues = {...values, id: row.id}
    } else if (row && child) {
      formValues = {...values, parentId: row.id}
    } else {
      formValues = values
    }
    dispatch({
      type: 'system/createMenu',
      payload: formValues,
      callback: (res: any) => {
        message.success(res.msg)
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
        initialValues={!child && row}
      >

        <Form.Item
          label="菜单编码"
          name="code"
          rules={[{ required: true, message: '请输入菜单编码!' }]}
        >
          <Input disabled={row.id && !child} />
        </Form.Item>

        <Form.Item
          label="菜单名称"
          name="name"
          rules={[{ required: true, message: '请输入菜单名称!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="顺序"
          name="order"
          rules={[{ required: true, message: '请输入菜单名称!' }]}
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

export default CreateEditMenu;
