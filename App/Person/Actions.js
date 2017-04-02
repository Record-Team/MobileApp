import { browserHistory } from 'react-router';
import { put, call, select } from 'redux-saga/effects'
import { SagaCollection } from '~/Lib/SagaCollection'
import FetchApi, { AuthApi } from '~/Lib/FetchApi'

export default (new SagaCollection('PERSON', {
    PersonName: '',
    Identifier: '',
    PersonID: null,
    IsAuthorized: false
}))
    .add('REGISTER_CHANGE_FORM', {
        saga: function* ({ type, ...fields }) {
            try {
                const form = yield select(store => store[this.componentName]);
                const newForm = { ...form, ...fields };
                yield put({ type: this.TYPE_SUCCESS, ...newForm })
            }
            catch (e) {
                yield put({ type: this.TYPE_FAILURE, ErrorMessage: e.message })
            }
        }
    })
    .add('REGISTRATION_RERSON', {
        saga: function* () {
            try {
                const { PersonName, Identifier } = yield select(store => store[this.componentName]);
                const queryParams = { PersonName, Identifier };
                const outputParams = ['PersonID'];
                const { Output: { PersonID } } = yield call(FetchApi, { url: 'API.PersonRegistration', queryParams, outputParams });

                localStorage.setItem('PersonID', PersonID);

                yield put({ type: this.TYPE_SUCCESS, IsAuthorized: true, PersonID })
                browserHistory.push('/funds');
            }
            catch (e) {
                yield put({ type: this.TYPE_FAILURE, IsAuthorized: false })
            }
        }
    })
    .add('PERSON_LOGIN', {
        saga: function* () {
            try {

                const { Idedntifier } = yield select(store => store[this.componentName]);
                const queryParams = { Idedntifier }
                const outputParams = ['PersonID'];
                const { Output: { PersonID } } = yield call(FetchApi, { url: 'API.PersonLogin', queryParams });

                localStorage.setItem('PersonID', PersonID);

                yield put({ type: this.TYPE_SUCCESS, PersonID, IsAuthorized: true })
            }
            catch (e) {
                yield put({ type: this.TYPE_FAILURE, IsAuthorized: false })
            }
        }
    })
    .add('GET_PERSON', {
        saga: function* () {
            try {
                const PersonID = localStorage.getItem('PersonID');
                if (!PersonID) {
                    yield put({
                        type: this.TYPE_FAILURE,
                        PersonName: '',
                        Identifier: '',
                        PersonID: null,
                        IsAuthorized: false
                    });
                    browserHistory.push('/person');
                }

                const { PersoneName, ID } = yield call(FetchApi, { url: 'API.FundListGet', queryParams: { id: 123 } });
                yield put({ type: this.TYPE_SUCCESS, IsAuthorized: true, PersonName, ID })
            }
            catch (e) {
                yield put({ type: this.TYPE_FAILURE, IsAuthorized: false })
            }
        }
    })

