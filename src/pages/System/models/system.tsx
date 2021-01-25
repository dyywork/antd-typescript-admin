import { Effect, Reducer } from 'umi';
import {createUser, createMenu} from '@/services/user';

export interface SystemModelType {
  namespace: 'system';
  state: any;
  effects: {
    createUser: Effect;
    createMenu: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<any>;
  };
}

const SystemModel: SystemModelType = {
  namespace: 'system',
  state: {},
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
  },
  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  }
}

export default SystemModel;
