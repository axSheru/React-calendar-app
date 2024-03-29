import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es-mx';

import { Navbar } from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { eventClearActiveEvent, eventSetActive, eventsStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale( 'es-mx' );

const localizer = momentLocalizer( moment );

export const CalendarScreen = () => {

    const dispatch = useDispatch();
    // TODO: Leer los eventos del store. Usar useSelect().
    const { events, activeEvent } = useSelector( state => state.event );
    const { uid } = useSelector( state => state.auth );

    const [lastView, setLastView] = useState( localStorage.getItem( 'lastView' ) || 'month' );

    useEffect(() => {
      dispatch( eventsStartLoading() );
    }, [ dispatch ])
    

    const onDoubleClick = ( e ) => {
        dispatch( uiOpenModal() );
    };

    const onSelectEvent = ( e ) => {
        dispatch( eventSetActive( e ) );
    };

    const onViewChange = ( e ) => {
        setLastView( e );
        localStorage.setItem( 'lastView', e );
    };

    const onSelectSlot = ( e ) => {
        dispatch( eventClearActiveEvent() );
    };

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        
        const style = {
            backgroundColor: ( uid === event.user._id ) ? '#BF33FF' : '#465660',
            borderRadius: '10px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        };

        return {style};

    };

    return (
        <div className='calendar-screen'>
            <Navbar />
            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor='start'
                endAccessor='end'
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
            />
            <AddNewFab />
            {
                ( activeEvent ) && <DeleteEventFab />
            }
            <CalendarModal />
        </div>
    );
};
