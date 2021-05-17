import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, {ActionType} from '@ant-design/pro-table';
import React, { useRef} from 'react';
import {Dispatch, connect, Link, history} from 'umi';
import { queryDutyList } from '@/services/user';
import { ConnectState } from '@/models/connect';
// import Link from 'umi/link';

interface SystemProps {
  dispatch: Dispatch;
}

const DutyList: React.FC<SystemProps> = () => {
  const ref = useRef<ActionType>();
  const editTable = (data: any) => {
    history.push(`/system/createEditDuty?id=${data.id}`);
  }
  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      search: false,
    },
    {
      title: '职责名称',
      dataIndex: 'name',
    },
    {
      title: '职责编码',
      dataIndex: 'code',
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


  return (
    <PageContainer>
      <ProTable
        headerTitle="职责列表"
        rowKey="id"
        columns={columns}
        actionRef={ref}
        pagination={
          {defaultPageSize: 10,}
        }
        toolBarRender={() => [
          <Link to="/system/createEditDuty">
            <Button type="primary" >
              <PlusOutlined/> 新建
            </Button>
          </Link>,
        ]}
        request={(params, sorter, filter) => queryDutyList({ ...params, sorter, filter })}
      />
    </PageContainer>
  )

}

export default connect(({ loading }: ConnectState) => ({
  loading,
}))(DutyList);
