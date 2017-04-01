import React, { Component } from 'react'
import { Connect } from '~/Lib/Connectors'
import PreloadWrapper from '~/Lib/PreloadWrapper'

@Connect('FUND')
export default class FundList extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GET_FUND_LIST' })
    }

    render() {
        const { FUND: { IsFetching, LoadingError, FundList } } = this.props;

        return <PreloadWrapper fetching={IsFetching} blank={true} error={LoadingError}>
            <div className="list-group">
                {FundList.map(x => <div key={x.FundID} className="list-group-item">
                    <div className="row-content">
                        <div className="least-content">{x.FundAmount}</div>
                        <h4 className="list-group-item-heading">{x.FundCaption}</h4>

                        <p className="list-group-item-text">{x.FundDescription}</p>
                    </div>
                </div>)}
            </div>
        </PreloadWrapper>
    }
}