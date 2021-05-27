import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeChannel } from '../channelsSlice';

const Channel = (props) => {
    const dispatch = useDispatch();
    const { id, isEditable, name, active } = props;
    const classes = `w-100 px-4 rounded-0 text-start btn ${active ? "btn-secondary" : ""}`;

    const handlerChangeChannel = (id) => () => {
        dispatch(changeChannel(id));
    }

    return (
        <li className="nav-item">
            <div role="group" className="d-flex dropdown btn-group">
                <button type="button" onClick={handlerChangeChannel(id)}
                        className={classes}><span
                    className="me-3">#</span>
                    {name}
                </button>
                {isEditable && <button aria-haspopup="true" aria-expanded="false" type="button"
                                       className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn"/>}
            </div>
        </li>
    );
};

export default Channel;
