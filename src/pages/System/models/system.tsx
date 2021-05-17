import { Effect, Reducer } from 'umi';
import {createUser, createMenu, queryMenuList, createDuty, detailDuty} from '@/services/user';

export interface SystemModelType {
  namespace: 'system';
  state: {
    menuList: any,
  };
  effects: {
    createUser: Effect;
    createMenu: Effect;
    queryMenuList: Effect;
    createDuty: Effect;
    detailDuty: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<any>;
    menuList: Reducer<any>;
    details: Reducer<any>;
  };
}

const SystemModel: SystemModelType = {
  namespace: 'system',
  state: {
    menuList: []
  },
  effects: {
    *createUser({payload, callback}, {call, put}) {
      const response = yield call(createUser, payload);
      yield put({
        type: 'save',
        payload: response,
      })
      if (callback) callback(response)
    },
    *createMenu({payload, callback}, {call, put}) {
      const response = yield call(createMenu, payload);
      yield put({
        type: 'save',
        payload: response,
      })
      if (callback) callback(response)
    },
    *createDuty({payload, callback}, {call, put}) {
      const response = yield call(createDuty, payload);
      yield put({
        type: 'save',
        payload: response,
      })
      if (callback) callback(response)
    },
    *detailDuty({payload, callback}, {call, put}) {
      const response = yield call(detailDuty, payload);
      yield put({
        type: 'details',
        payload: { data:response, key: 'detail' },
      })
      if (callback) callback(response)
    },
    *queryMenuList({payload}, {call, put}) {
      const response = yield call(queryMenuList, payload);
      yield put({
        type: 'menuList',
        payload: response,
      })
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    menuList(state, action) {
      return {
        ...state,
        menuList: action.payload.data || []
      }
    },
    details(state, action) {
      return {
        ...state,
        [action.payload.key]: action.payload.data
      }
    }
  }
}

export default SystemModel;
