import React, { Component } from 'react'
import { Connect } from '~/Lib/Connectors'

@Connect('PERSON')
export default class Register extends Component {
    render() {
        const {
            dispatch,
            PERSON: {
                PersonName,
                Identifier,
                RegisterError,
            }
         } = this.props;

        return <form className="form-horizontal" onSubmit={e => {
            e.preventDefault();
            dispatch({ type: 'REGISTRATION_RERSON' });
        }}>
            <fieldset>
                <legend
                    style={{
                        paddingTop: '50px',
                        textAlign: 'center'
                    }}
                >Регистрация</legend>
                <div className="form-group is-empty">
                    <div className="col-md-10">
                        <input
                            value={PersonName}
                            onChange={e => dispatch({ type: 'REGISTER_CHANGE_FORM', PersonName: e.target.value })}
                            className="form-control" placeholder="ФИО" />
                    </div>
                </div>

                <div className="form-group is-empty">
                    <div className="col-md-10">
                        <input
                            value={Identifier}
                            onChange={e => dispatch({ type: 'REGISTER_CHANGE_FORM', Identifier: e.target.value })}
                            className="form-control" placeholder="Логин" />
                    </div>
                       
                    {RegisterError && 
                        <p style={{textAlign: 'center'}} className="text-warning">{RegisterError}</p>
                    }
                </div>

                <div className="form-group">
                    <div className="col-md-10 col-md-offset-2">
                        <button
                            disabled={!PersonName || !Identifier}
                            type='submit'
                            className="btn btn-raised btn-success">
                            OK<div className="ripple-container"></div>
                        </button>
                    </div>
                </div>
            </fieldset>

        </form>
    }
}