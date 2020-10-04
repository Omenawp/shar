import React, { useState } from 'react';
import ProfileStatus from './ProfileStatus';
import s from './Profile.module.css';
import photo from '../../../assets/totoro.png';
import { useEffect } from 'react';

function Profile(props) {
    let authUser = (props.authUserId === props.profile.id);

    return (
       <div className={s.profile}>
            <img src={ props.profile.photos.large || photo } alt='' />

            {authUser && <ChangePhoto deletePhoto={props.deletePhoto}
                                      updatePhoto={props.updatePhoto} 
                                      photos={props.profile.photos} 
                                      inProgress={props.inProgress}/> }

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

function ChangePhoto (props) {
    let [photoMode, setPhotoMode] = useState(false);

    useEffect(() => {setPhotoMode(false)}, [props.photos]);

    const updatePhoto = (e) => {
        props.updatePhoto(e.target.files[0]);
        e.target.value = '';
    }

    return (<>
        {photoMode 
            ? <div>
                <input type="file" onChange={updatePhoto} disabled={props.inProgress} />
                <button onClick={props.deletePhoto} disabled={props.inProgress} >Delete photo</button>
            </div>
            : <button onClick={() => setPhotoMode(true)}>Change</button>
        }
    </>)
}

export default Profile;