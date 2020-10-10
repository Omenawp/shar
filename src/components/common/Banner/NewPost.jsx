import React from 'react';
import { connect } from 'react-redux';
import s from './NewPost.module.css';
import Preloader from '../Preloader/Preloader';
import { preloadImage, clearImage, toggleNewPostMode, addPost } from '../../../redux/posts-reducer';
import add from '../../../assets/add.png';
import clear from '../../../assets/delete.png';
import { useState } from 'react';

const NewPost = (props) => {
    const [text, changeText] = useState('');

    let preload = (e) => {
        props.preloadImage(e.target.files[0]);
        e.target.value = '';
    }
    let onChange = (e) => {
        changeText(e.currentTarget.value);
    }
    let cancel = () => {
        props.clearImage();
        props.toggleNewPostMode(false)
    }
 
    return (
    <div className={s.banner} >
        {props.inProgress
            ? <Preloader />
            : <div className={s.main}> 
                <div className={s.title}>New post</div>
                <div className={s.picture} >
                {props.preimageURL 
                    ? <>
                        <img src={props.preimageURL} className={s.loadpic}/>
                        <img src={clear} alt="" onClick={props.clearImage} className={s.delete}/>
                    </>
                    : <>
                        <input id="file-input" type="file" name="file"  onChange={preload}/>
                        <label for="file-input" >
                        <img src={add} alt="" />
                    </label>
                    </>
                }</div>
                <div className={s.line}></div>
                <textarea className={s.text} placeholder="Enter text here..." 
                    value={text} onChange={onChange}></textarea>

                <div className={s.buttons}>
                    <button className={s.add} onClick={() => props.addPost(text)}>Add</button>
                    <button className={s.cancel} onClick={cancel}>Cancel</button>
                </div>
            </div>
        }
    </div>
    )
}

let mapStateToProps = (state) => {
    return {
        preimageURL: state.posts.preimageURL,
        inProgress: state.posts.inProgress
    }
}

export default connect(mapStateToProps, { preloadImage, clearImage, toggleNewPostMode, addPost })(NewPost);

