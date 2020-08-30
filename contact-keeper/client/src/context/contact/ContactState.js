import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './ContactContext';
import contactReducer from './ContactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id:1,
                name:'h w',
                email:'h@g.com',
                phone: '232323232',
                type: 'professional'
            },
            {
                id:2,
                name:'w h',
                email:'h@g.com',
                phone: '232323232',
                type: 'professional'
            },
            {
                id:3,
                name:'a b',
                email:'h@g.com',
                phone: '232323232',
                type: 'professional'
            }
        ]
    };

    const [state , dispatch ] = useReducer(contactReducer , initialState); 

    // Add Contact

    // Delete Contact

    // Set Current contact

    // Clear Current Contact

    // Update Contact

    // Filter Contacts 

    // Clear Filter

    return (
        <ContactContext.Provider 
        value={{
            contacts: state.contacts
        }}>
            { props.children }
        </ContactContext.Provider>
    )
};

export default ContactState;