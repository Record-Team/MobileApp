import { put, call, select } from 'redux-saga/effects'
import { SagaCollection } from '~/Lib/SagaCollection'
import FetchApi, { AuthApi } from '~/Lib/FetchApi'

export default (new SagaCollection('PERSON', {
    PersonName: null,
    PersonLogin: null,
    ID: null,
    IsAuthorized: false,
    IsRegistered: false,
}))
    .add('REGISTRATION_RERSON', {
        saga: function* () {
            try {
                const { } = yield select(store => store[this.componentName]);

                const queryParams = {};
                const { ID } = yield call(FetchApi, { url: 'API.PersonRegistration', queryParams: { login } });
                yield put({ type: this.TYPE_SUCCESS, IsAuthorized: true, PersonName: login, ID })
            }
            catch (e) {
                yield put({ type: this.TYPE_FAILURE, IsAuthorized: false, IsRegistered: false })
            }
        }
    })
    .add('PERSON_LOGIN', {
        saga: function* () {
            try {
                yield call(AuthApi, { url: 'login', queryParams: { id: 123 } });
                yield put({ type: this.TYPE_SUCCESS, IsAuthorized: true })
            }
            catch (e) {
                yield put({ type: this.TYPE_FAILURE, IsAuthorized: false })
            }
        }
    })
    .add('GET_PERSON', {
        saga: function* () {
            try {
                const { PersoneName, ID } = yield call(FetchApi, { url: 'API.FundListGet', queryParams: { id: 123 } });
                yield put({ type: this.TYPE_SUCCESS, IsAuthorized: true, PersonName, ID })
            }
            catch (e) {
                yield put({ type: this.TYPE_FAILURE, IsAuthorized: false })
            }
        }
    })

