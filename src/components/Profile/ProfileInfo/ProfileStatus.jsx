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
        if(e.currentTarget.value.length < 100)
            setStatus(e.currentTarget.value)
    }

    useEffect( () => {
        setStatus(props.status)
    }, [props.status])

    return (
        <>
        {!editMode && 
            <span onDoubleClick={ props.authUser && toggleEditMode } className={status || s.empty}> 
                {status || ( props.authUser && 'Type your status here..') } 
            </span>
        }
        
        {editMode && 
            <textarea autoFocus onChange={ onChange } onBlur={ toggleEditMode } 
                    value={status || ''} className={s.statusChange} wrap="soft"></textarea>
        }
        </>
    )
}

export default ProfileStatus;