import React from 'react';
import s from './Posts.module.css';
import add from '../../../assets/add.png';
import user from '../../../assets/user.jpeg';
import heart from '../../../assets/heart.png';
import heartfull from '../../../assets/heartfull.png';

const Posts = React.memo( props => {
    console.log('posts');

    return (
        <div className={s.main}>
            {props.authUser && <img src={add} alt="" className={s.add} onClick={()=> props.toggleNewPostMode(true)}/>}
            
            { props.posts.length === 0 ? <div></div>
            : props.posts.map(p => 
                <div key={p.id} className={s.post} >
                    <div className={s.head}>
                        <img src={props.profile.photos.small || user} alt="" className={s.userPhoto}/>
                        <div className={s.name} >{props.profile.name}</div>
                        <div className={s.data} >{p.added_on}</div>
                        {props.authUser && <button onClick={() => props.authUser && props.deletePost(p.id)} 
                            className={s.delete}>Delete</button>
                        }
                    </div>
                    <div className={s.text}>{p.text}</div>
                    {p.photo && <img src={p.photo} alt="" className={s.picture} /> }
                    <div className={s.like}>
                        {p.like
                            ? <button  onClick={() => props.dislike(p.id)} 
                                       disabled={props.followingInProgress.some(id => id === p.id)}>
                                <img src={heartfull} alt="" />
                            </button>

                            : <button onClick={() => props.like(p.id)} 
                                      disabled={props.followingInProgress.some(id => id === p.id)}>
                                <img src={heart} alt="" />
                            </button>
                        }
                        {p.likes}
                    </div>
                </div> 
            )}
            {props.maxPage !== props.currentPage && 
                <button className={s.next} 
                    onClick={() => props.getAllPosts(props.profile.id, props.currentPage + 1)} >
                        Next
                </button>
            }
        </div>
    )
});


export default Posts;