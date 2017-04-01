import { browserHistory } from 'react-router';
import { put, call, select } from 'redux-saga/effects'
import { SagaCollection } from '~/Lib/SagaCollection'
import FetchApi from '~/Lib/FetchApi'

const NewFund = () => ({
    FundCaption: '',
    FundDescription: '',
    FundTypeID: null
})

export default (new SagaCollection('FUND', {
    IsFetching: true,
    FundList: [],
    LoadingError: null,
    FundTypes: [],
    NewFund: NewFund(),
    IsAdded: false
}))
    .add('GET_FUND_LIST', {
        mapAction: () => ({ IsFetching: true }),
        saga: function* () {
            try {
                const PersonID = 561360;
                const { Recordset: FundList } = yield call(FetchApi, { url: 'API.Funds', queryParams: { PersonID } });
                yield put({ type: this.TYPE_SUCCESS, IsFetching: false, LoadingError: null, FundList })
            }
            catch (e) {
                yield put({ type: this.TYPE_FAILURE, IsFetching: false, LoadingError: e.message })
            }
        }
    })
    .add('INIT_CREATE_FUND', {
        saga: function* () {
            try {
                const { Recordset: FundTypes } = yield call(FetchApi, { url: 'API.FundTypes' });
                yield put({ type: this.TYPE_SUCCESS, NewFund: NewFund(), FundTypes, ErrorMessage: null })
            }
            catch (e) {
                yield put({ type: this.TYPE_FAILURE, FundTypes: [], ErrorMessage: e.message })
            }
        }
    })
    .add('CHANGE_FUND_FIELDS', {
        saga: function* ({ type, ...fields }) {
            try {
                let { NewFund } = yield select(store => store[this.componentName]);
                NewFund = { ...NewFund, ...fields };
                yield put({ type: this.TYPE_SUCCESS, NewFund })
            }
            catch (e) {
                yield put({ type: this.TYPE_FAILURE, ErrorMessage: e.message })
            }
        }
    })
    .add('FUND_ADD', {
        saga: function* () {
            try {
                const { NewFund } = yield select(store => store[this.componentName]);

                const queryParams = { ...NewFund, PersonID: 561360 };
                const outputParams = ['FundID']
                const { Output: { FundID } } = yield call(FetchApi, { url: 'API.FundAdd', queryParams, outputParams });
                yield put({ type: this.TYPE_SUCCESS, IsAdded: true, ErrorMessage: null })
                browserHistory.push(`/funds`);
            }
            catch (e) {
                yield put({ type: this.TYPE_FAILURE, ErrorMessage: e.message })
            }
        }
    })