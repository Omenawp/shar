import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { compose } from 'redux';
import { getProfile, updateStatus} from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import Preloader from '../common/Preloader/Preloader';


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
        if (this.props.match.params.userId != prevProps.match.params.userId ) {
            this.refreshProfile();
        }
    }

    render() {
        if(this.props.profile === null)
            return <Preloader />

        return <Profile profile={this.props.profile} status={this.props.status}
            updateStatus={this.props.updateStatus} setStatus={this.props.setStatus}
            authUserId={this.props.authUserId} /> 
            
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        currentUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
        authUserId: state.auth.userId,
    }
}

export default compose(
    connect(mapStateToProps, { getProfile, updateStatus }), withRouter, withAuthRedirect
    )(ProfileContainer);