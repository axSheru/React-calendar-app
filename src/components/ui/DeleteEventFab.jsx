import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { eventStartDelete } from '../../actions/events';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();
    const { activeEvent } = useSelector( state => state.event );

    const handleDelete = () => {
        dispatch( eventStartDelete( activeEvent ) );
    };

    return (
        <button
            className='btn btn-danger fab-danger'
            onClick={ handleDelete }
        >
            <i className='fas fa-trash'></i>
            <span> Borrar evento</span>
        </button>
    );
};
