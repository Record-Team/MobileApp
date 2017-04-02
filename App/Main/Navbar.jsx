import React, { Component } from 'react'
import { Link } from 'react-router'
export default class NavBar extends Component {

    componentWillReceiveProps(nextProps) {
        $('#collapseMenu').collapse('hide');
    }

    render() {

        const { title, buttons = [] } = this.props;
        return <div className="navbar navbar-info">
            <div className="container-fluid">

                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-material-light-blue-collapse">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="javascript:void(0)">{title}</a>
                </div>
                <div id='collapseMenu' className="navbar-collapse collapse navbar-material-light-blue-collapse">
                    <ul className="nav navbar-nav">
                        {buttons.map((x, key) => <li key={key} className="active"><Link to={x.url}>{x.title}</Link></li>)}
                    </ul>
                </div>
            </div>
        </div>
    }
}