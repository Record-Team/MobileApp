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
                yield put({ type: this.TYPE_FAILURE })
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

                yield put({ type: this.TYPE_SUCCESS, RegisterError: null, IsAuthorized: true, PersonID })
                browserHistory.push('/funds');
            }
            catch (e) {
                console.log(e, e.message)
                yield put({ type: this.TYPE_FAILURE, RegisterError: e.message, IsAuthorized: false })
            }
        }
    })
    .add('PERSON_LOGIN', {
        mapAction: () => ({
            LoginError: null
        }),
        saga: function* () {
            try {
                const { Identifier } = yield select(store => store[this.componentName]);
                const queryParams = { Identifier }
                const outputParams = ['PersonID'];
                const { Output: { PersonID } } = yield call(FetchApi, { url: 'API.PersonLogin', queryParams, outputParams });
                if (PersonID === undefined) {
                    yield put({ type: this.TYPE_FAILURE, LoginError: 'Не верный логин', IsAuthorized: false })
                    return
                }
                localStorage.setItem('PersonID', PersonID);
                yield put({ type: this.TYPE_SUCCESS, PersonID, LoginError: null, IsAuthorized: true })
                browserHistory.push('/funds');
            }
            catch (e) {
                yield put({ type: this.TYPE_FAILURE, ErrorMessage: e.message, LoginError: 'Не верный логин', IsAuthorized: false })
            }
        }
    })
    .add('GET_PERSON', {
        saga: function* () {
            try {
                const PersonID = localStorage.getItem('PersonID');
                if (!PersonID || PersonID === 'undefined') {
                    yield put({
                        type: this.TYPE_FAILURE,
                        PersonName: '',
                        Identifier: '',
                        PersonID: null,
                        IsAuthorized: false
                    });
                    browserHistory.push('/person');
                    yield put({ type: this.TYPE_FAILURE, ErrorMessage: 'Не найден PersonID', IsAuthorized: false })
                    return;
                }

                const { Recordset } = yield call(FetchApi, { url: 'API.PersonGet', queryParams: { PersonID } });
                const [{ PersonName }] = Recordset;

                yield put({ type: this.TYPE_SUCCESS, IsAuthorized: true, PersonName, PersonID })
            }
            catch (e) {
                yield put({ type: this.TYPE_FAILURE, ErrorMessage: e.message, IsAuthorized: false })
            }
        }
    })

