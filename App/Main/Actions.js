import { put, call, select } from 'redux-saga/effects'
import { SagaCollection } from '~/Lib/SagaCollection'
import FetchApi from '~/Lib/FetchApi'

export default (new SagaCollection('MAIN', {
    IsFetching: true,
    LoadingError: null
}))
.add('INIT_LIST_GROUP', {
    saga: function*() {
        const data = yield call(FetchApi, { url: 'API.Test', queryParams: {} });
        console.log(data);
        yield put({type: this.TYPE_SUCCESS})
    }
})