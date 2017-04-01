import React from 'react'

//                <span className='glyphicon glyphicon-chevron-left' />


export default props => {
    const { title } = props.children.props.route
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
            <div className="navbar-collapse collapse navbar-material-light-blue-collapse">
                <ul className="nav navbar-nav">
                    <li className="active"><a href="javascript:void(0)">Active</a></li>
                    <li><a href="javascript:void(0)">Link</a></li>
                </ul>
            </div>
        </div>
    </div>
}