import React, { useEffect } from 'react';
import Channels from './Channels';
import Messages from './Messages';
import axios from 'axios';
import routes from '../routes';
import { setInitialState } from '../channelsSlice';
import { useAuth } from '../helpers/auth-helper';
import { useDispatch } from 'react-redux';
import FormMessage from './FormMessage';
import { openModal } from '../modalSlice';
import ModalAddChannel from './ModalAddChannel';

const Chat = (props) => {
    const auth = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {

        const setStateChannels = async () => {
            const response = await axios.get(routes.dataChats(), {
                headers: { Authorization: `Bearer ${auth.token}` }
            });
            dispatch(setInitialState(response.data));
        }

        setStateChannels();

    }, [])

    const handlerAddChannel = () => {
        dispatch(openModal({ type: "addChannel" }));
    }

    return (
        <div className="container flex-grow-1 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white">
                <div className="col-2 px-0 pt-5 border-end bg-light">
                    <div className="d-flex justify-content-between mb-2 px-4"><span>Каналы</span>
                        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={handlerAddChannel}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20"
                                 height="20" fill="currentColor">
                                <path
                                    d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                            {/*<span className="visually-hidden">+</span>*/}
                        </button>
                    </div>
                        <Channels />
                </div>
                <div className="col p-0 h-100">
                    <div className="d-flex flex-column h-100">
                        <Messages />
                        <FormMessage />
                    </div>
                </div>
            </div>
            <ModalAddChannel />
        </div>
    );
};

export default Chat;
