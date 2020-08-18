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

        <div className={this.props.isAuth? 'content-wrapper' : 'login'}>
          <Route path='/profile/:userId?' render={() => <ProfileContainer />} exact/>
          <Route path='/users' render={() => <UsersContainer />} />
          <Route path='/login' render={() => <Login />} />
          <Route path='/register' render={() => <Signup />} />
          <Route path='/'><Redirect to={'/login'} /> </Route>
        </div> 
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
    isAuth: state.auth.isAuth
  }
}

export default compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);
