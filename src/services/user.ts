import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/user/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
// 用户列表
export async function queryUserList(params: any): Promise<any> {
  return request('/api/user/list', {
    params
  });
}
// 新增用户
export async function createUser(data: any): Promise<any> {
  return request('/api/user/create', {
    method: 'post',
    data
  });
}
// 职责列表
export async function queryDutyList(params: any): Promise<any> {
  return request('/api/system/dutyList', {
    params
  });
}
// 新增职责
export async function createDuty(data: any): Promise<any> {
  return request('/api/system/createDuty', {
    method: 'post',
    data
  });
}
// 职责详情
export async function detailDuty(data: any): Promise<any> {
  return request('/api/system/detail', {
    method: 'get',
    params:data
  });
}
// 角色列表
export async function queryRoleList(params: any): Promise<any> {
  return request('/api/system/roleList', {
    params
  });
}
// 菜单列表
export async function queryMenuList(params: any): Promise<any> {
  return request('/api/menu/list', {
    params
  });
}
// 新增菜单
export async function createMenu(data: any): Promise<any> {
  return request('/api/menu/create', {
    method: 'post',
    data
  });
}
