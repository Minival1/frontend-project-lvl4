import React from 'react';
import { Formik } from "formik";
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../modalSlice';
import { useSocket } from '../helpers/socketContext';

const ModalAddChannel = (props) => {

    const isThisModal = useSelector(state => state.modal.isOpened && state.modal.type === "addChannel");
    const dispatch = useDispatch();
    const socket = useSocket();

    const handlerClose = () => dispatch(closeModal());

    return (
        <Modal show={isThisModal} onHide={handlerClose}>
            <Modal.Header>
                <Modal.Title>Добавить канал</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Formik
                    initialValues={{ channelName: "" }}
                    onSubmit={(values) => {
                        socket.emit("newChannel", { name: values.channelName })
                    }}
                >
                {({isSubmitting, handleSubmit, handleChange}) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-2">
                            <Form.Control onChange={handleChange} id="channelName" type="text" name="channelName"/>
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" className="me-2" onClick={handlerClose}>Отменить</Button>
                            <Button variant="primary" type="submit">Отправить</Button>
                        </div>
                    </Form>
                )}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}

export default ModalAddChannel;
