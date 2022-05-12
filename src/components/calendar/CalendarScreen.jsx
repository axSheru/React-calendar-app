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
import { useDispatch } from 'react-redux';

moment.locale( 'es-mx' );

const localizer = momentLocalizer( moment );

const events = [{
    title: 'Cumpleaños del jefe',
    start: moment().toDate(),
    end: moment().add( 2, 'hours' ).toDate(),
    bgcolor: '#fafafa',
    notes: 'Comprar el pastel',
    user: {
        _id: '123',
        name: 'Alex'
    }
}];

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    const [lastView, setLastView] = useState( localStorage.getItem( 'lastView' ) || 'month' );

    const onDoubleClick = ( e ) => {
        dispatch( uiOpenModal() );
    };

    const onSelectEvent = ( e ) => {
        console.log(e);
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
            <CalendarModal />
        </div>
    );
};
