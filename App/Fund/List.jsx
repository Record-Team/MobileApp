import React, { Component } from 'react'
import { Link } from 'react-router'
import { Connect } from '~/Lib/Connectors'
import PreloadWrapper from '~/Lib/PreloadWrapper'

@Connect('FUND')
export default class FundList extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GET_FUND_LIST' })
    }

    render() {
        const { dispatch, FUND: { IsFetching, LoadingError, FundList } } = this.props;

        return <PreloadWrapper fetching={IsFetching} blank={true} error={LoadingError}>
            <div className="list-group">
                {FundList.map(({FundID, ...x}) => <Link key={FundID}
                    to={`/funds/${FundID}`} 
                    className="list-group-item">
                    <div className="row-content">
                        <div className="least-content">{x.FundStateCaption}</div>
                        <h4 className="list-group-item-heading">{x.FundCaption}</h4>
                        <p className="list-group-item-text">{x.FounderTitle}</p>
                    </div>
                </Link>)}
            </div>
        </PreloadWrapper>
    }
}