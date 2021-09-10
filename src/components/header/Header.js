import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import logo from './logo.svg';

function Header() {
    return (
        <div className="Header">
            <div className="container">
                <div className="logo-container">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/price">Jita Price</Link>
                        </li>
                        <li>
                            <Link to="/routes">Trade Routes</Link>
                        </li>
                        <li>
                            <Link to="/contacts">Contacts</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Header;
