import React, { useState } from 'react';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';

import '../../styles/modal.css';
import '../../styles/datepicker.css';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const now = moment().minutes( 0 ).seconds( 0 ).add( 1, 'hours' );
const nowPlusOne = now.clone().add( 1, 'hours' );

export const CalendarModal = () => {

    
    const dispatch = useDispatch();
    const { modalOpen } = useSelector( state => state.ui );

    const [ startDate, setStartDate ] = useState( now.toDate() );
    const [ endDate, setEndDate ] = useState( nowPlusOne.toDate() );
    const [ titleValid, setTitleValid ] = useState( true );

    const [ formValues, setFormValues ] = useState({
        title: 'Evento',
        notes: '',
        start: now.toDate(),
        end: nowPlusOne.toDate()
    });

    const { notes, title, start, end } = formValues;

    const handleInputChange = ({ target }) => {

        setFormValues({
            ...formValues,
            [ target.name ]: target.value
        });

    };

    const closeModal = () => {
        dispatch( uiCloseModal() );
    };

    const handleStartDateChange = ( e ) => {
        setStartDate( e );
        setFormValues({
            ...formValues,
            start: e
        });
    };

    const handleEndDateChange = ( e ) => {
        setEndDate( e );
        setFormValues({
            ...formValues,
            end: e
        });
    };

    const handleSubmitForm = ( e ) => {
        e.preventDefault();
        
        const momentStart = moment( start );
        const momentEnd = moment( end );

        // From validations.
        if ( momentStart.isSameOrAfter( momentEnd ) ) Swal.fire( 'Error', 'La fecha de fin debe de ser superior a la de inicio.', 'error' );
        if ( title.trim().length < 2 ) setTitleValid( false );

        // TODO: Guardar en BD.

        setTitleValid( true );
        closeModal();

    };

    return (
        <Modal
            isOpen={ modalOpen }
            onRequestClose={ closeModal }
            style={ customStyles }
            closeTimeoutMS={ 200 }
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form
                className="container"
                onSubmit={ handleSubmitForm }
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ startDate }
                        className='form-control'
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        value={ endDate }
                        minDate={ startDate }
                        className='form-control'
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={ `form-control ${ !titleValid && 'is-invalid' }` }
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    );
};
