import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { compose } from 'redux';
import { getProfile, updateStatus, updatePhoto, deletePhoto} from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import Preloader from '../common/Preloader/Preloader';
import { preloadImage, changePostText, clearImage, addPost } from '../../redux/posts-reducer';
import Posts from './Posts/Posts';


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
    }

    componentDidMount () {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId ) {
            debugger;
            this.refreshProfile();
        }
    }

    render() {
        if(this.props.profile === null)
            return <Preloader />

        return <>
            <ProfileInfo profile={this.props.profile} status={this.props.status}
            updateStatus={this.props.updateStatus} setStatus={this.props.setStatus}
            authUserId={this.props.authUserId} updatePhoto={this.props.updatePhoto}
            deletePhoto={this.props.deletePhoto} inProgress={this.props.inProgress}/> 

            {/* <Posts preloadImage={this.props.preloadImage} changePostText={this.props.changePostText}
            postText={this.props.postText} preimageURL={this.props.preimageURL}
            clearImage={this.props.clearImage} addPost={this.props.addPost} /> */}
        </>
            
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        currentUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
        authUserId: state.auth.userId,
        inProgress: state.profilePage.inProgress,
        postText: state.posts.postText,
        preimageURL: state.posts.preimageURL,
    }
}

export default compose(
    connect(mapStateToProps, 
        { getProfile, updateStatus, updatePhoto, deletePhoto , preloadImage, changePostText, clearImage, addPost}), 
        withRouter, 
        withAuthRedirect
    )(ProfileContainer);
