import React, { useRef } from 'react';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { useSocket } from '../helpers/socketContext';
import { useAuth } from '../helpers/auth-helper';

const FormMessage = (props) => {

    const auth = useAuth();

    const currentChannelId = useSelector(state => state.channelsInfo.currentChannelId);
    const socket = useSocket();

    const inputEl = useRef(null);

    return (
        <div className="border-top mt-auto py-3 px-5">
            <Formik
                initialValues={{ message: '' }}
                onSubmit={async (values, actions) => {

                    socket.emit("newMessage", {
                        username: auth.username,
                        message: values.message,
                        channelId: currentChannelId,
                    });

                    actions.resetForm()
                    inputEl.current.focus()
                }}
            >
                {({ handleChange, handleSubmit, values }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input name="message"
                                   data-testid="new-message"
                                   placeholder="Введите сообщение..."
                                   className="border-0 form-control"
                                   onChange={handleChange}
                                   value={values.message}
                                   ref={inputEl}
                                   required
                            />
                            <div className="input-group-append">
                                <button type="submit" className="btn btn-group-vertical">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 16 16" width="30" height="30"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                                    </svg>
                                    <span className="visually-hidden">Отправить</span>
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormMessage;
