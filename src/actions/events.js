import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startEventAddNew = ( event ) => {
    return async ( dispatch, getState ) => {

        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken( 'events', event, 'POST' );
            const body = await resp.json();

            if ( body.ok ) {

                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name
                };
                
                dispatch( eventAddNew( event ) );

            }

        } catch (error) {
            Swal.fire( 'Error', error, 'error' );
            console.log( error );
        }

    };
};

const eventAddNew = ( event ) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = ( event ) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});

export const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventDeleted = () => ({
    type: types.eventDeleted
});

export const eventsStartLoading = () => {
    return async ( dispatch ) => {

        try {

            const resp = await fetchConToken( 'events' );
            const body = await resp.json();

            dispatch( eventsLoaded( body.eventos ) );

        } catch (error) {
            console.log( error );
        }

    };
};

const eventsLoaded = ( events ) => ({
    type: types.eventLoaded,
    payload: events
});