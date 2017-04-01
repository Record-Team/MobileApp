import 'bootstrap-webpack';
import 'bootstrap-material-design';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.css';
import "bootstrap-material-design/dist/css/ripples.css";
import "bootstrap-material-design/dist/js/material.js";
import 'bootstrap-material-design/dist/js/ripples.js';
import './Style.less'
$.material.init();

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRedirect, IndexRoute, browserHistory } from 'react-router';
import { StoreProvider } from './Lib/Connectors';

import Main from './Main'
import MainActions from './Main/Actions'
import Navbar from './Main/Navbar'
import ListGroup from './Main/ListGroup'

import PersonRegister from './Person/Register'
import PersonLogin from './Person/Login'
import PersonActions from './Person/Actions'

import FundNew from './Fund/New'
import FundList from './Fund/List'
import FundActions from './Fund/Actions'

const NavigationRoutes = {
    Funds: {
        title: 'Цели',
        buttons: [
            { title: 'Новая цель', url: '/funds/new' }
        ]
    }   
}

const Layout = props => <div className='container'>
    <div className='row'>
        <Navbar {...props} {...NavigationRoutes[props.navigation]} />
    </div>
    <div className='row'>
        <div className='col-md-12'>
            {props.children}
        </div>
    </div>
</div>

const UnAuthorizedLayout = props => <div className='container'>
    <div className='row'>
        <div className='col-md-12'>
            {props.children}
        </div>
    </div>
</div>

const Error404 = () => <div><h4>Ошибка</h4><div>Что-то пошло не так</div></div>

render((
    <StoreProvider sagaCollections={[FundActions, PersonActions]}>
        <Router history={browserHistory}>
            <Route component={UnAuthorizedLayout}>
                <Route path={`person/register`} component={PersonRegister} />
                <Route path={`person/login`} component={PersonLogin} />
            </Route>
            <Route path={_ROOT_URL_} component={Layout}>
                <Route path='/funds' component={FundList} navigation='Funds' />
                <Route path='/funds/new' component={FundNew} navigation='NewFund' />
            </Route>
            <Route path='*' component={Error404} />
        </Router>
    </StoreProvider>
), document.getElementById('AppContainer'));
/*
render((
    <StoreProvider sagaCollections={Actions} reducers={List.Reducer}>
        <Router history={browserHistory}>
            <Route path={`${_ROOT_URL_}/login`} component={AuthForm} />
            <Route path={_ROOT_URL_} component={Layout}>
                <IndexRedirect to='list' />
                <Route path='list' component={List.Component} />
                <Route path='new' component={New} />
                <Route path='edit/:RequestID' component={Edit} />
            </Route>
            <Route path='*' component={Error404} />
        </Router>
    </StoreProvider>
), document.getElementById('AppContainer'));*/