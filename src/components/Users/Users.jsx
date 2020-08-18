import React from 'react';
import s from './Users.module.css';
import photo from '../../assets/totoro.png';
import { NavLink } from 'react-router-dom';
import preloader from '../../assets/preloader.svg';

const Users = (props) => {
    const cropStatus = (status) => {
        if(status != null && status.length > 40)
            return status.slice(0, 37) + '...';
        return status
    }

    let searchText = React.createRef();
    let onSearchChange = () => {
        let text = searchText.current.value;
        props.updateSearchText(text);
    }


    return <div className={s.content}>

        <div className={s.search} >
            <input onChange={ onSearchChange} ref={searchText}
                value={props.searchText}/>
            <button onClick={ () => props.searchUsers() } >Go</button>
        </div>

        {(props.users.length !== 0 || props.isFetching) ? 

        <div>
            {props.users.map(u => <div key={u.id} className={s.item}>
                <NavLink to={'/profile/'+u.id} className={s.info}>
                    <img src={photo} alt={u.id}/>
                    <div>
                        <div className={s.name}>{u.name}</div>
                        <div className={s.status}>{ cropStatus(u.status) }</div>
                    </div>
                </NavLink>
                    {u.followed ?
                    <button disabled={props.followingProgress.some( id => id === u.id)} 
                        onClick={() => props.unfollow(u.id) } className={s.unfollow}>Unfollow</button> :
                    <button disabled={props.followingProgress.some( id => id === u.id)} 
                        onClick={() => props.follow(u.id) } className={s.follow}>Follow</button> 
                    }
            </div>)}
            
            {props.isFetching? <img src={preloader} alt=""/> :
                (props.currentPage !== props.maxPage) &&
                <button className={s.next} onClick={ () => {props.nextUsersPage(props.currentPage + 1) } } >Next</button>
            } 
        </div>
        : <div className={s.error} >Not found</div>}
        
    </div>
}

export default Users;