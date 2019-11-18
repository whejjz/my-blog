export default {
  namespace: 'app',
  state: {

  },
  subscriptions: {

  },
  effects : {
    *signOut({ payload } : any, { call, put } : any) {
      const data = yield call('logoutUser')
      if (data.success) {
        
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
  },
  reducers: {
    updateState (state: Object, { payload }: any) {
      return {
        ...state,
        ...payload
      }
    }
  }
}