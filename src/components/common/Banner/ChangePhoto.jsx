import React from 'react';
import { connect } from 'react-redux';
import { updatePhoto, deletePhoto, toggleEditPhotoMode } from '../../../redux/profile-reducer';
import s from './ChangePhoto.module.css';
import Preloader from '../Preloader/Preloader';

const ChangePhoto = (props) => {
    const updatePhoto = (e) => {
        props.updatePhoto(e.target.files[0]);
    }

    return (
    <div className={s.banner} >
        {props.inProgress ? <Preloader />
        :<div className={s.main}>
            <div className={s.title}>Change photo</div>

            <div className={s.item} >
                <input id="file-input" type="file" name="file" onChange={updatePhoto} />
                <label for="file-input" >Upload photo</label>
            </div>

            <div className={s.item} onClick={props.deletePhoto} >Delete current photo</div>
            <div className={s.item} onClick={() => props.toggleEditPhotoMode(false)}>
                Cancel
            </div>
        </div>
        }
    </div>
    )
}

let mapStateToProps = (state) => {
    return {
        inProgress: state.profilePage.inProgress,
    }
}

export default connect(mapStateToProps, { updatePhoto, deletePhoto, toggleEditPhotoMode })(ChangePhoto);

