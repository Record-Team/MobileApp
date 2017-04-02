import React, { Component } from 'react'
import { Link } from 'react-router'

export default class PersonEntry extends Component {
    render() {
        return <form className="form-horizontal">
            <fieldset>
                <div className="form-group is-empty">
                    <div className="col-md-10 col-md-offset-2">
                        <Link
                            to='/person/register'
                            className="btn btn-primary">
                            Зарегистрироваться<div className="ripple-container" />
                        </Link>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-md-10 col-md-offset-2">
                        <Link
                            to='/person/login'
                            className="btn btn-primary">
                            Войти<div className="ripple-container" />
                        </Link>
                    </div>
                </div>
            </fieldset>

        </form>
    }
}