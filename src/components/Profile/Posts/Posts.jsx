import React from 'react';

function Posts(props) {
    let newPostElement = React.createRef();

    let onChange = (e) => {
        props.changePostText(newPostElement.current.value);
    }

    let preload = (e) => {
        props.preloadImage(e.target.files[0]);
        e.target.value = '';
    }
    return (
        <div>
            {props.preimageURL 
                ? <div>
                    <img src={props.preimageURL} alt="" width="500px"/>
                    <button onClick={props.clearImage}>delete</button>
                </div>
                : <input type="file" onChange={preload} />
            }
            <input type="text" ref={newPostElement} value={props.postText} onChange={onChange}></input>
            <button onClick={props.addPost}>Add Post</button>
        </div>
    )
}


export default Posts;