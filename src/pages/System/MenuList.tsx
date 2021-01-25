import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type {ActionType} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import React, {useState, useRef} from 'react';
import type {Dispatch} from 'umi';
import { connect} from 'umi';
import { queryMenuList } from '@/services/user';
import CreateEditMenu from '@/pages/System/components/CreateEditMenu';
import type { ConnectState } from '@/models/connect';

type SystemProps = {
  dispatch: Dispatch;
}

const MenuList: React.FC<SystemProps> = (props) => {
  const {dispatch} = props;
  const ref = useRef<ActionType>();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [row, setRow] = useState<Object>({});
  const [child, setChild] = useState<boolean>(false);
  const editTable = (data: Object) => {
    setRow(data);
    setChild(false);
    handleModalVisible(true)
  }

  const addChildrenMenu = (data: Object) => {
    setRow(data);
    setChild(true);
    handleModalVisible(true);
  }

  const columns: any = [
    {
      title: '菜单名称',
      dataIndex: 'name',
    },
    {
      title: '菜单编码',
      dataIndex: 'code',
    },
    {
      title: '顺序',
      dataIndex: 'order',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text: string, record: any) => [
        !record.parentId &&
        <a
          key="addChildrenMenu"
          onClick={() => {
            addChildrenMenu?.(record);
          }}
        >
          添加子菜单
        </a>,
        <a
          key="editable"
          onClick={() => {
            editTable?.(record);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  const reloadTable = () => {
    ref.current?.reload();
  }

  const createParams: any = {
    isModalVisible: createModalVisible,
    handleCancel: handleModalVisible,
    dispatch,
    reloadTable,
    row,
    child,
  }

  return (
    <PageContainer>
      {createModalVisible && <CreateEditMenu {...createParams} />}
      <ProTable
        headerTitle="角色列表"
        rowKey="id"
        columns={columns}
        actionRef={ref}
        pagination={
          false
        }
        toolBarRender={() => [
          <Button type="primary" onClick={() => {
            handleModalVisible(true)
            setRow({})
            setChild(false);
          }} >
            <PlusOutlined/> 新建
          </Button>,
        ]}
        request={(params, sorter, filter) => queryMenuList({ ...params, sorter, filter })}
      />
    </PageContainer>
  )

}

export default connect(({ loading }: ConnectState) => ({
  loading,
}))(MenuList);
