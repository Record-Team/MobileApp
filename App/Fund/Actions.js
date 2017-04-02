import { browserHistory } from 'react-router';
import { put, call, select } from 'redux-saga/effects'
import { SagaCollection, callSync } from '~/Lib/SagaCollection'
import FetchApi from '~/Lib/FetchApi'

const NewFund = () => ({
    FundCaption: '',
    FundDescription: '',
    FundTypeID: null
})

export default (new SagaCollection('FUND', {
    IsFetching: true,
    FundList: [],
    FundItem: null,
    ContactList: [],
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
                const { PersonID } = yield select(store => store['PERSON']);

                const queryParams = { ...NewFund, PersonID };
                const outputParams = ['FundID']
                const { Output: { FundID } } = yield call(FetchApi, { url: 'API.FundAdd', queryParams, outputParams });
                yield put({ type: this.TYPE_SUCCESS, IsAdded: true, ErrorMessage: null })
                browserHistory.push('/funds');
            }
            catch (e) {
                yield put({ type: this.TYPE_FAILURE, ErrorMessage: e.message })
            }
        }
    })
    .add('FUND_GET', {
        mapAction: () => ({ IsFetching: true, LoadingError: null }),
        saga: function* ({ FundID }) {
            try {
                // const { PersonID } = yield select(store => store['PERSON']);
                const { type, PersonID } = yield callSync('GET_PERSON');
                if (type !== 'GET_PERSON_SUCCESS') {
                    yield put({ type: this.TYPE_FAILURE, LoadingError: 'Ошибка' });
                    return;
                }
                const { Recordset: [FundItem] } = yield call(FetchApi, { url: 'API.FundGet', queryParams: { FundID, PersonID } })
                const { Recordset: ContactList = [] } = yield call(FetchApi, { url: 'API.FundContacts', queryParams: { FundID, PersonID } })
                yield put({ type: this.TYPE_SUCCESS, FundItem, ContactList, PersonID, IsFetching: false, LoadingError: null })
            }
            catch (e) {
                yield put({ type: this.TYPE_FAILURE, IsFetching: false, LoadingError: e.message })
            }
        }
    })
    .add('GET_PERSON_CONTACTS', {
        mapAction: () => ({ IsFetching: true, LoadingError: null }),
        saga: function* () {
            try {
                const { type, PersonID } = yield callSync('GET_PERSON');
                if (type !== 'GET_PERSON_SUCCESS') {
                    yield put({ type: this.TYPE_FAILURE, LoadingError: 'Ошибка' });
                    return;
                }

                const { Recordset: PersonContacts } = yield call(FetchApi, { url: 'API.PersonContacts', queryParams: { PersonID } });
                yield put({ type: this.TYPE_SUCCESS, PersonContacts, IsFetching: false, LoadingError: null })
            }
            catch (e) {
                yield put({ type: this.TYPE_FAILURE, IsFetching: false, LoadingError: e.message })
            }
        }
    })
    .add('INVITE_SEND', {
        saga: function* ({ InviteeID }) {
            try {
                let { FundItem: { FundID }, PersonID, ContactList } = yield select(store => store[this.componentName]);
                const queryParams = { InviteeID, PersonID, FundID };
                yield call(FetchApi, { url: 'API.InviteSend', queryParams });
                ContactList = ContactList.map(x => x.PersonID === InviteeID ? { ...x, Invite: true } : x);

                yield put({ type: this.TYPE_SUCCESS, ContactList, ErrorMessage: null })
            }
            catch (e) {
                yield put({ type: this.TYPE_FAILURE, ErrorMessage: e.message })
            }
        }
    })
    .add('INVITE_CLOSE', {
        saga: function* ({ InviteeID }) {
            try {
                let { FundItem: { FundID }, PersonID, ContactList } = yield select(store => store[this.componentName]);
                const queryParams = { InviteeID, PersonID, FundID };
                yield call(FetchApi, { url: 'API.InviteClose', queryParams });
                ContactList = ContactList.map(x => x.PersonID === InviteeID ? { ...x, Invite: false } : x);

                yield put({ type: this.TYPE_SUCCESS, ContactList, ErrorMessage: null })
            }
            catch (e) {
                yield put({ type: this.TYPE_FAILURE, ErrorMessage: e.message })
            }
        }
    })
    .add('INVITE_ACCEPT', {
        saga: function* () {
            try {
                const { type, PersonID } = yield callSync('GET_PERSON');
                if (type !== 'GET_PERSON_SUCCESS') {
                    yield put({ type: this.TYPE_FAILURE, LoadingError: 'Ошибка' });
                    return;
                }

                let { FundItem: { FundID }, PersonID, ContactList } = yield select(store => store[this.componentName]);
                const queryParams = { PersonID, FundID };
                yield call(FetchApi, { url: 'API.InviteAccept', queryParams });
                ContactList = ContactList.map(x => x.PersonID === InviteeID ? { ...x, Invite: false } : x);
                yield put({ type: this.TYPE_SUCCESS, ContactList, ErrorMessage: null })
            }
            catch (e) {
                yield put({ type: this.TYPE_FAILURE, ErrorMessage: e.message })
            }
        }
    })