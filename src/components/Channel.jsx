import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeChannel } from '../channelsSlice';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import ModalRemoveChannel from './ModalRemoveChannel';
import ModalRenameChannel from './ModalRenameChannel';
import { openModal } from '../modalSlice';

const Channel = (props) => {
    const dispatch = useDispatch();
    const { id, isEditable, name, active } = props;
    const classes = "w-100 px-4 rounded-0 text-start";

    const handlerChangeChannel = (id) => () => {
        dispatch(changeChannel(id));
    }

    const handlerOpenModal = (type, channelId) => () => {
        dispatch(openModal({ type, channelId }))
    }

    const renderDropdown = () => {
        return (
        <>
            <Dropdown.Toggle variant={active ? "secondary" : false} split id="dropdown-split-basic" />

            <Dropdown.Menu>
                <Dropdown.Item href="#" onClick={handlerOpenModal("removeChannel", id)}>Удалить</Dropdown.Item>
                <Dropdown.Item href="#" onClick={handlerOpenModal("renameChannel", id)}>Переименовать</Dropdown.Item>
            </Dropdown.Menu>
        </>
        )
    }

    return (
        <li className="nav-item">
            <Dropdown as={ButtonGroup} className="d-flex">
                <Button variant={active ? "secondary" : false} onClick={handlerChangeChannel(id)} className={classes}>
                    <span className="me-3">#</span>
                    {name}
                </Button>

                {isEditable && renderDropdown()}

            </Dropdown>

            <ModalRemoveChannel />
            <ModalRenameChannel />
        </li>
    );
};

export default Channel;
