import React, { Component } from 'react'
import { Connect } from '~/Lib/Connectors'

@Connect('FUND')
export default class CreateFund extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'INIT_CREATE_FUND' })
    }

    render() {
        let {
            dispatch,
            FUND: {
                FundTypes,
                NewFund,
        } } = this.props;

        const ChosenType = FundTypes.find(x => x.FundTypeID === NewFund.ChosenTypeId);
        // FundTypes = [...FundTypes, { name: 'Тип', value: null }]

        return <form className="form-horizontal">

            <div className="form-group is-empty">
                <div className="col-md-10">
                    <input
                        type="email"
                        value={NewFund.FundCaption}
                        onChange={(e) => dispatch({ type: 'CHANGE_FUND_FIELDS', FundCaption: e.target.value })}
                        className="form-control"
                        placeholder="Название" />
                </div>
            </div>

            <div className="form-group is-empty">
                <div className="col-md-10">
                    <textarea
                        className="form-control"
                        value={NewFund.FundDescription}
                        onChange={(e) => dispatch({ type: 'CHANGE_FUND_FIELDS', FundDescription: e.target.value })}
                        placeholder="Описание"></textarea>
                </div>
            </div>

            <div className="form-group is-empty">
                <div className='col-md-2'>
                    <label>Тип цели</label>
                </div>
                <div className="col-md-10">
                    <select className="form-control" onChange={e => dispatch({ type: 'CHANGE_FUND_FIELDS', FundTypeID: e.target.value })}>
                        {FundTypes.map(x => <option
                            selected={ChosenType && NewFund.FundTypeID === x.FundTypeID}
                            key={x.FundTypeID}
                            value={x.FundTypeID}>{x.FundTypeCaption}</option>)}
                    </select>
                </div>
            </div>

            {ChosenType && <div className="form-group is-empty">
                <div className='col-md-2'>
                    <label>Описание</label>
                </div>
                <div className="col-md-10">
                    <div>
                        {ChosenType.FundTypeDescription}
                    </div>
                </div>
            </div>}


            <div className="form-group">
                <div className="col-md-10 col-md-offset-2">
                    <a href="javascript:void(0)"
                        onClick={() => dispatch({ type: 'FUND_ADD' })}
                        className="btn btn-raised btn-success">
                        Создать<div className="ripple-container" />
                    </a>
                </div>
            </div>
        </form>
    }
}