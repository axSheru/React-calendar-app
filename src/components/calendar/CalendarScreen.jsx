import React, { useState } from 'react'
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
import { eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';

moment.locale( 'es-mx' );

const localizer = momentLocalizer( moment );

export const CalendarScreen = () => {

    const dispatch = useDispatch();
    // TODO: Leer los eventos del store. Usar useSelect().
    const { events } = useSelector( state => state.event );

    const [lastView, setLastView] = useState( localStorage.getItem( 'lastView' ) || 'month' );

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

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        
        const style = {
            backgroundColor: '#BF33FF',
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
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
            />
            <AddNewFab />
            <CalendarModal />
        </div>
    );
};
