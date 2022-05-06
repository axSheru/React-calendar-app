import React, { useState } from 'react';
import Modal from 'react-modal';

import '../../styles/modal.css';

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

export const CalendarModal = () => {

    const [isOpen, setIsOpen] = useState( true );

    const closeModal = () => {
        console.log( 'closing.....' );
        setIsOpen( false );
    };

    return (
        <Modal
            isOpen={ isOpen }
            onRequestClose={ closeModal }
            style={ customStyles }
            closeTimeoutMS={ 200 }
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1>Hola mundo</h1>
            <hr />
            <span>Holaaaaaaaaaaa otra vez!!!!1</span>
        </Modal>
    );
};