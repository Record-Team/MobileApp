import React, { Component } from 'react'
import { Connect } from '~/Lib/Connectors'

@Connect('PERSON')
export default class Register extends Component {
    render() {
        const { dispatch } = this.props;
        return <form className="form-horizontal">
            <fieldset>
                <legend>Вход</legend>
                <div className="form-group is-empty">
                    <div className="col-md-10">
                        <input type="email" className="form-control" id="inputEmail" placeholder="Имя" />
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-md-10 col-md-offset-2">
                        <button
                            onClick={() => dispatch({ type: 'PERSON_LOGIN' })}
                            type="submit"
                            className="btn btn-primary">
                            OK<div className="ripple-container" />
                        </button>
                    </div>
                </div>
            </fieldset>

        </form>
    }
}