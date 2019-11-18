import api from 'src/server/api'

const { loginUser } = api

export default {
  namespace: 'login',

  state: {
    loading: ''
  },

  effects: {
    *login({ payload }: any, { put, call, select }: any) {
      const data = yield call(loginUser, payload)
      const { locationQuery } = yield select((_:any) => _.app)
      if (data.success) {
        
      } else {
        throw data
      }
    },
  },
}