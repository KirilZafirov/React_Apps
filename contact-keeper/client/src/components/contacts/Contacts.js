import React, { Fragment, useContext , useEffect } from 'react'
import ContactContext from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layout/Spinner';

const Contacts = () => {

    const contactContext = useContext(ContactContext);

    const { contacts, filtered , getContacts , loading } = contactContext;

    useEffect(() => {
        getContacts();
        //eslint-disable-next-line
    }, []);

    if (contacts !== null && contacts.length === 0 && !loading) {
        return <h4>Please add a contact</h4>
    };

    return (
        <Fragment>
            { contacts !== null && !loading ? ( <TransitionGroup>
                {filtered !== null ?
                    filtered.length > 0 ?
                        filtered.map(contact =>
                            (
                                <CSSTransition key={contact._id} timeout={500} classNames="item">
                                    <ContactItem contact={contact} />
                                </CSSTransition>
                            )
                        ) :
                        (
                            <CSSTransition timeout={500} classNames="item">
                                <h4>No contacts for that filter</h4>
                            </CSSTransition>
                        ) :
                    contacts.map(contact =>
                        (
                            <CSSTransition key={contact._id} timeout={500} classNames="item">
                                <ContactItem contact={contact} />
                            </CSSTransition>
                        )
                    )}
            </TransitionGroup>) : <Spinner />} 
        </Fragment>
    )
}

export default Contacts;