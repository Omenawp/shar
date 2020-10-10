import React from 'react';
import ProfileStatus from './ProfileStatus';
import s from './Profile.module.css';
import photo from '../../../assets/userbig.jpg';

const Profile = (props) => {
    console.log('profile');

    const canEdit = () => {
        if(props.authUser)
            props.toggleEditPhotoMode(true);
    }

    return (
       <div className={s.profile}>
            <img src={ props.profile.photos.large || photo } alt='' onClick={ canEdit }/>

            <div className={s.info}>
                <div className={s.name}>
                    {props.profile.name}
                </div>
                <div>
                {props.profile.email}
                </div>
                
                <div className={s.status}>
                    <ProfileStatus  status={props.profile.status}
                                    updateStatus={props.updateStatus}
                                    authUser={props.authUser} />
                </div>
            </div>
       </div> 
    )
}

export default Profile;