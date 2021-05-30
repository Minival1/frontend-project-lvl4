import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../helpers/auth-helper';
import routes from '../routes';

const Navbar = (props) => {
    const auth = useAuth();
    const handlerLogout = () => {
        auth.signOut();
    }

    return (
        <nav className="mb-3 navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="mr-auto navbar-brand" to="/">Chat</Link>
                {auth.token && <Link to={routes.loginFormPath()}><button onClick={handlerLogout} type="button" className="btn btn-primary">Выйти</button></Link>}
            </div>
        </nav>
    );
};

export default Navbar;
