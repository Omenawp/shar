import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { compose } from 'redux';
import { getProfile, updateStatus, toggleEditPhotoMode } from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import Preloader from '../common/Preloader/Preloader';
import Posts from './Posts/Posts';
import { getAllPosts, toggleNewPostMode, deletePost, likePost, dislikePost, resetState } from '../../redux/posts-reducer';


class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = this.props.currentUserId;
            if(!userId){
                this.props.history.push('/login');
            }
        }
        this.props.getProfile(userId);
        this.props.getAllPosts(userId, this.props.currentPage);
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    componentDidMount () {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId ) {
            this.refreshProfile();
        }
    }

    render() {
        if(this.props.profile === null || this.props.posts === null)
            return <Preloader />

        let authUser = (this.props.currentUserId === this.props.profile.id);

        return <>
            <ProfileInfo profile={this.props.profile} status={this.props.status}
                updateStatus={this.props.updateStatus} setStatus={this.props.setStatus}
                authUser={authUser} toggleEditPhotoMode={this.props.toggleEditPhotoMode} /> 

            <Posts posts={this.props.posts} authUser={authUser} 
                toggleNewPostMode={this.props.toggleNewPostMode} profile={this.props.profile} 
                like={this.props.likePost} dislike={this.props.dislikePost} deletePost={this.props.deletePost} 
                followingInProgress={this.props.followingInProgress} currentPage={this.props.currentPage} 
                maxPage={this.props.maxPage} getAllPosts={this.props.getAllPosts} />
        </>   
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        currentUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
        posts: state.posts.posts,
        followingInProgress: state.posts.followingInProgress,
        currentPage: state.posts.currentPage,
        maxPage: state.posts.maxPage,
    }
}

export default compose(
    connect(mapStateToProps, 
        { getProfile, updateStatus, toggleEditPhotoMode, getAllPosts, toggleNewPostMode,
        deletePost, likePost, dislikePost, resetState }), 
        withRouter, withAuthRedirect)(ProfileContainer);