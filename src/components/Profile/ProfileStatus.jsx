import React, { useState, useEffect } from 'react';
import s from './Profile.module.css';

const ProfileStatus = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status)
    
    const toggleEditMode = () => {
        if(editMode)
            props.updateStatus(status)
        setEditMode(!editMode)
    }

    const onChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    useEffect( () => {
        setStatus(props.status)
    }, [props.status])

    return (
        <>
        {!editMode && 
            <span onDoubleClick={ props.authUser && toggleEditMode } > "{status || 'empty' }" </span>
        }
        
        {editMode && 
            <input autoFocus='true' onChange={ onChange } onBlur={ toggleEditMode } 
                    value={status} className={s.statusChange} ></input>
        }
        </>
    )
}

export default ProfileStatus;