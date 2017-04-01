import React, { Component } from 'react'
import { Connect } from '~/Lib/Connectors'

@Connect('PERSON')
export default class Register extends Component {
    render() {
        return <form className="form-horizontal">
            <fieldset>
                <legend>Регистрация</legend>
                <div className="form-group is-empty">
                    <div className="col-md-10">
                        <input className="form-control" placeholder="ФИО" />
                    </div>
                </div>

                <div className="form-group is-empty">
                    <div className="col-md-10">
                        <input className="form-control" placeholder="Логин" />
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-md-10 col-md-offset-2">
                        <a href="javascript:void(0)" onClick={() => dispatch({ type: 'REGISTRATION_RERSON' })} className="btn btn-raised btn-success">
                            OK<div className="ripple-container" />
                        </a>
                    </div>
                </div>
            </fieldset>

        </form>
    }
}