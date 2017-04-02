import React, { Component } from 'react'
import { Link } from 'react-router'
import logo from './logo.jpg'

export default class PersonEntry extends Component {
    render() {
        return <form className="form-horizontal">
            <fieldset>

                <div className="form-group">
                    <img
                        style={{
                            display: 'block',
                            margin: 'auto',
                            width: '40%',
                            borderRadius: '100px'
                        }}
                        src={logo} />
                </div>

                <div className="form-group is-empty">
                    <div className="col-md-10 col-md-offset-2" style={{ textAlign: 'center' }}>
                        <Link
                            to='/person/register' className="btn btn-raised btn-success">
                            Зарегистрироваться<div className="ripple-container"></div></Link>
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-md-10 col-md-offset-2" style={{ textAlign: 'center' }}>
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