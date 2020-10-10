import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';

const Navbar = (props) => {
    return  <nav className={s.nav}>
        <div className={s.item} >
            <NavLink to='/profile' activeClassName={s.active}>Profile</NavLink>
        </div>
        <div className={s.item}>
            <NavLink to="/users" activeClassName={s.active}>Users</NavLink>
        </div>
    </nav>
}

export default Navbar;