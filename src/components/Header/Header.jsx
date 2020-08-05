import React from 'react';
import s from './Header.module.css';
import totoro from '../../assets/totoro.png';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return (
        <div className={s.header}>
            <img src={totoro} alt=''/>
            <div className={s.right}>
                <NavLink className={s.name} to={`/profile/${props.user.userId}`}> 
                    {props.user.name} 
                </NavLink>
                <div onClick={ props.logout } className={s.button}>Log out</div>
            </div> 
        </div>
    )
}

export default Header;