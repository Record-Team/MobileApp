import React, { Component } from 'react'
import { Connect } from '~/Lib/Connectors'
/*
<div className="row-action-primary">
            <i className="material-icons">folder</i>
        </div>*/
@Connect('MAIN')
export default class ListGroup extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'INIT_LIST_GROUP'})
    }

    render() {
        return <div className="list-group">
            <div className="list-group-item">

                <div className="row-content">
                    <div className="least-content">15m</div>
                    <h4 className="list-group-item-heading">Tile with a label</h4>

                    <p className="list-group-item-text">Donec id elit non mi porta gravida at eget metus.</p>
                </div>
            </div>
            <div className="list-group-separator"></div>
            <div className="list-group-item">
                <div className="row-content">
                    <div className="least-content">10m</div>
                    <h4 className="list-group-item-heading">Tile with a label</h4>

                    <p className="list-group-item-text">Maecenas sed diam eget risus varius blandit.</p>
                </div>
            </div>
            <div className="list-group-separator"></div>
            <div className="list-group-item">
                <div className="row-content">
                    <div className="least-content">8m</div>
                    <h4 className="list-group-item-heading">Tile with a label</h4>

                    <p className="list-group-item-text">Maecenas sed diam eget risus varius blandit.</p>
                </div>
            </div>
            <div className="list-group-separator"></div>
        </div>
    }
}