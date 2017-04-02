import React, { Component } from 'react'
import { Connect } from '~/Lib/Connectors'
import PreloadWrapper from '~/Lib/PreloadWrapper'

@Connect('FUND')
export default class CreateFund extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FUND_GET', FundID: this.props.params.FundID })
    }

    render() {
        const {
            dispatch,
            FUND: {
                FundItem = {},
                IsFetching,
                LoadingError
        } } = this.props;

        const Fund = FundItem || {}

        return <PreloadWrapper fetching={IsFetching} blank={true} error={LoadingError}>
            <form className="form-horizontal">

                <div className="form-group is-empty">
                    <div className="col-md-10">
                        {Fund.FundCaption}
                    </div>
                </div>

                <div className="form-group is-empty">
                    <div className="col-md-10">
                        {Fund.FundDescription}
                    </div>
                </div>

                <div className="form-group is-empty">
                    <div className="col-md-10">
                        {Fund.FounderTitle}
                    </div>
                </div>



                <div className="form-group">
                    <div className="col-md-10 col-md-offset-2">

                        {Fund.ButtonInviteAccept && <button
                            onClick={e => {
                                e.preventDefault();
                                dispatch({ type: 'FUND_ADD' })
                            }}
                            className="btn btn-raised btn-success">
                            Вступить<div className="ripple-container" />
                        </button>}

                        {Fund.ButtonInviteReject && <button
                            onClick={e => {
                                e.preventDefault();
                                dispatch({ type: 'FUND_ADD' })
                            }}
                            className="btn btn-raised btn-warning">
                            Отказаться<div className="ripple-container" />
                        </button>}
                    </div>
                </div>
            </form>
        </PreloadWrapper>
    }
}