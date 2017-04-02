import React, { Component } from 'react'
import { Connect } from '~/Lib/Connectors'
import PreloadWrapper from '~/Lib/PreloadWrapper'
const contactBtnStyle = {
    padding: '0 0 0 0',
    margin: '0 0 0 0'
}

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
                ContactList,
                IsFetching,
                LoadingError
        } } = this.props;

        const Fund = FundItem || {}
        const Contacts = ContactList || [];

        return <PreloadWrapper fetching={IsFetching} blank={true} error={LoadingError}>
            <form className="form-horizontal">

                <div className="form-group is-empty" style={{ margin: '0' }}>
                    <div className="col-md-10">
                        <h3>{Fund.FundCaption}</h3>
                    </div>
                </div>

                <div className="form-group is-empty">
                    <div className="col-md-10">
                        <label>Описание</label>
                        <div>{Fund.FundDescription}</div>
                    </div>
                </div>

                <div className="form-group is-empty">
                    <div className="col-md-10">
                        <label>Учредитель</label>
                        <div>{Fund.FounderTitle}</div>
                    </div>
                </div>



                <div className="form-group">
                    <div className="col-md-10 col-md-offset-2"
                        style={{ textAlign: 'center' }}>


                        {Fund.ButtonInviteAccept && <button
                            onClick={e => {
                                e.preventDefault();
                                dispatch({ type: 'INVITE_ACCEPT' })
                            }}
                            className="btn btn-raised btn-success">
                            Вступить<div className="ripple-container" />
                        </button>}

                        {Fund.ButtonInviteReject && <button
                            onClick={e => {
                                e.preventDefault();
                                dispatch({ type: 'INVITE_REJECT' })
                            }}
                            className="btn btn-raised btn-warning">
                            Отказаться<div className="ripple-container" />
                        </button>}

                        {Fund.ButtonFinish && <button
                            onClick={e => {
                                e.preventDefault();
                                dispatch({ type: 'FUND_FINISH' })
                            }}
                            className="btn btn-raised btn-primary">
                            Завершить цель<div className="ripple-container" />
                        </button>}
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-md-10 col-md-offset-2">

                        <label>Участники</label>

                        <div className="list-group">
                            {Contacts.map(({ PersonID, ...x }) => <div
                                key={PersonID}
                                className="list-group-item">
                                <div className="row-content">
                                    <span className="list-group-item-text">{x.PersonName}</span>
                                    <div className="least-content">
                                        {x.Invite
                                            ? <a
                                                style={contactBtnStyle}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    dispatch({ type: 'INVITE_CLOSE', InviteeID: PersonID })
                                                }}
                                                href="javascript:void(0)" className="btn btn-warning">Исключить<div className="ripple-container"></div></a>
                                            : <a
                                                style={contactBtnStyle}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    dispatch({ type: 'INVITE_SEND', InviteeID: PersonID })
                                                }}
                                                href="javascript:void(0)" className="btn btn-success">Добавить<div className="ripple-container"></div></a>
                                        }
                                    </div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </form >
        </PreloadWrapper >
    }
}