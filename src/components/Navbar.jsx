import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <nav className="mb-3 navbar navbar-expand-lg navbar-light bg-light">
            <Link className="mr-auto navbar-brand" to="/">Chat</Link>
        </nav>
    )
}

export default Navbar;