import React from 'react';
import { connect, history } from 'umi';
import type { ConnectState } from '@/models/connect';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Form, Input, Card, Tree, Row, message } from 'antd';

// const {TreeNode} = Tree;

class CreateEditDuty extends React.Component<any, any> {

  state = {
    selectedKeys: [],
  };

  componentWillMount() {
    const {dispatch, location: {query}} = this.props;

    dispatch({
      type: 'system/queryMenuList'
    })
   console.log(this.props)
    if (query.id) {
      dispatch({
        type: 'system/detailDuty',
        payload: {id: query.id},
        callback: (res: any) => {
          this.setState({
            selectedKeys: res.data.ids,
          })
        }
      })
    }
  }

  onFinish = (data: any) => {
    const {dispatch} = this.props;
    const {selectedKeys} = this.state;
    dispatch({
      type: 'system/createDuty',
      payload: { ...data, currentAuthorityId: selectedKeys },
      callback: (res: any) => {
        if (res.code === 200) {
          message.success(res.msg);
          history.push('/system/dutyList')
        }
      }
    })
  }

  onCheck = (key: any) => {
    this.setState({
      selectedKeys: key,
    })
  }

  onSelect = () => {

  }

  render(): React.ReactNode {
    const { menuList, detail } = this.props;
    const { selectedKeys } = this.state;
    const listMenu = JSON.parse(JSON.stringify(menuList).replace(/name/g, 'title').replace(/id/g, 'key'))
    const layout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };

    const tailLayout = {
      wrapperCol: { offset: 11, span: 6 },
    };
    return (
      <PageContainer>
        <Card>
          <Form
            {...layout}
            onFinish={(data) => this.onFinish(data)}
            style={{width: '500px', margin: '0 auto'}}
            initialValues={detail && detail.data || {}}
          >
            <Form.Item
              label="职责编码"
              name="code"
              rules={[{ required: true, message: '请输入职责编码!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="职责名称"
              name="name"
              rules={[{ required: true, message: '请输入职责名称!' }]}
            >
              <Input />
            </Form.Item>
            <Row justify="center">
               <Tree
                checkable
                defaultExpandAll
                treeData={listMenu}
                checkedKeys={selectedKeys}
                onCheck={this.onCheck}
                onSelect={this.onSelect}
               />
            </Row>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </PageContainer>
    )
  }
}

export default connect(({ system ,loading }: ConnectState) => ({
  loading,
  menuList: system.menuList,
  detail: system.detail
}))(CreateEditDuty);
