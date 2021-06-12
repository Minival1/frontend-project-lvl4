import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../helpers/socketContext';
import { closeModal } from '../modalSlice';

const ModalRemoveChannel = (props) => {
    const isThisModal = useSelector(state => state.modal.isOpened && state.modal.type === "removeChannel");
    const channelId = useSelector(state => state.modal.channelId);
    const dispatch = useDispatch()
    const socket = useSocket();

    const handlerClose = () => dispatch(closeModal());

    const handlerRemoveChannel = () => {
        socket.emit("removeChannel", { id: channelId })
    }

    return (
        <Modal show={isThisModal} onHide={handlerClose}>
            <Modal.Header>
                <Modal.Title>Удалить канал?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="d-flex justify-content-end">
                    <Button variant="secondary" className="me-2" onClick={handlerClose}>Отменить</Button>
                    <Button variant="primary" onClick={handlerRemoveChannel}>Удалить</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalRemoveChannel;
