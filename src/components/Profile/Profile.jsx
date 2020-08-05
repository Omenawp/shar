import React from 'react';
import ProfileStatus from './ProfileStatus';
import s from './Profile.module.css';
import photo from '../../assets/totoro.png';

function Profile(props) {
    let authUser = (props.authUserId === props.profile.id);

    return (
       <div className={s.profile}>
            <img src={photo} alt='' />
            <div className={s.name}>
                {props.profile.name}
            </div>
            <div>
               {props.profile.email}
            </div>
               
            <div className={s.status}>
                <ProfileStatus  status={props.profile.status}
                                updateStatus={props.updateStatus}
                                authUser={authUser} />
            </div>
       </div> 
    )
}

export default Profile;