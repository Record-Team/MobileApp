import React, { Component } from 'react'
import { Connect } from '~/Lib/Connectors'

@Connect('PERSON')
export default class Register extends Component {
    render() {
        const { dispatch, PERSON: { Identifier, LoginError } } = this.props;
        return <form className="form-horizontal" onSubmit={e => {
            e.preventDefault();
            dispatch({ type: 'PERSON_LOGIN' });
        }}>
            <fieldset>
                <legend
                    style={{
                        paddingTop: '50px',
                        textAlign: 'center'
                    }}
                >Вход</legend>
                <div className="form-group is-empty">
                    <div className="col-md-10">
                        <input
                            value={Identifier}
                            onChange={e => dispatch({ type: 'REGISTER_CHANGE_FORM', Identifier: e.target.value })}
                            type="text"
                            className="form-control"
                            placeholder="Имя" />
                    </div>
                        
                    {LoginError && 
                        <p style={{textAlign: 'center'}} className="text-warning">{LoginError}</p>
                    }
                </div>

                <div className="form-group">
                    <div className="col-md-10 col-md-offset-2">
                        <button
                            disabled={!Identifier}
                            type="submit"
                            className="btn btn-primary">
                            OK<div className="ripple-container" />
                        </button>
                    </div>
                </div>

            </fieldset>

        </form >
    }
}