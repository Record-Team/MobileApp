import React, { Component } from 'react'
import { Link } from 'react-router'
import { Connect } from '~/Lib/Connectors'
import PreloadWrapper from '~/Lib/PreloadWrapper'

@Connect('FUND')
export default class AddContacts extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GET_PERSON_CONTACTS' });
    }

    render() {
        const { dispatch, FUND: { IsFetching, LoadingError, PersonContacts } } = this.props;

        const Contacts = PersonContacts || [];
        console.log(Contacts)
        return <PreloadWrapper fetching={IsFetching} blank={true} error={LoadingError}>
            <div className="list-group">
                {Contacts.map(({ PersonID, ...x }) => <div
                    key={PersonID}
                    className="list-group-item">
                    <div className="row-content">
                            <p className="list-group-item-text">{x.PersonName}</p>

                        <div className="least-content">
                            <a
                                onClick={e => {
                                    e.preventDefault();
                                    dispatch({ type: 'INVITE_SEND' })
                                }}
                                href="javascript:void(0)" className="btn btn-success">Добавить<div className="ripple-container"></div></a>
                        </div>
                    </div>
                </div>)}
            </div>

        </PreloadWrapper>
    }
}