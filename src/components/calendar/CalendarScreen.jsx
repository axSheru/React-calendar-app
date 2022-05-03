import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es-mx';

import { Navbar } from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-es';

moment.locale( 'es-mx' );

const localizer = momentLocalizer( moment );

const events = [{
    title: 'Cumpleaños del jefe',
    start: moment().toDate(),
    end: moment().add( 2, 'hours' ).toDate(),
    bgcolor: '#fafafa',
    notes: 'Comprar el pastel'
}];

export const CalendarScreen = () => {

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
            />
        </div>
    );
};
