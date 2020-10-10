import React from 'react';
import './App.css';
import {Route, withRouter, Redirect} from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader';
import { initializeApp } from './redux/app-reducer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import Navbar from './components/Navbar/Navbar';
import Signup from './components/Signup/Signup';
import ChangePhoto from './components/common/Banner/ChangePhoto';
import NewPost from './components/common/Banner/NewPost';

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if(!this.props.initialized) return <Preloader />

    return (
      <div className={this.props.isAuth? 'app-wrapper' : 'login-wrapper'}>
        {this.props.isAuth &&  <HeaderContainer /> }
        {this.props.isAuth &&  <Navbar /> }

        {this.props.editPhotoMode && <ChangePhoto /> }
        {this.props.newPostMode && <NewPost /> }

        <div className={this.props.isAuth? 'content-wrapper' : 'login'}>
          <Route path='/profile/:userId?' render={() => <ProfileContainer />} exact/>
          <Route path='/users' render={() => <UsersContainer />} exact/>
          <Route path='/login' render={() => <Login />} exact/>
          <Route path='/register' render={() => <Signup />} exact/>
          <Route path='/' render={() => <Redirect to="/profile" /> } />
        </div> 
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
    isAuth: state.auth.isAuth,
    editPhotoMode: state.profilePage.editPhotoMode,
    newPostMode: state.posts.newPostMode,
  }
}

export default compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);