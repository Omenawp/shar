import React from 'react';
import { Field, reduxForm, isSubmitting } from 'redux-form';
import { Input } from '../common/FormControls/FormControls';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { required } from '../../utils/validators';
import { login } from '../../redux/auth-reducer';
import s from './Login.module.css';
import preloader from '../../assets/preloader.svg';

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.formItem}>
                <div className={s.label}>Email</div>
                <Field component={Input} name="email" placeholder="example@example.com" validate={[required]} />
            </div>
            <div className={s.formItem}>
                <div className={s.label}>Password</div>
                <Field component={Input} name="password" placeholder="password" type="password" 
                validate={[required]} />
            </div>
            {props.error && <div className={s.error}>{props.error}</div>}
            <div className={s.buttons}>
                {!props.submitting ? 
                    <button disabled={props.submitting }>Log In</button> :
                    <img src={preloader} alt='' className={s.preloader}/>
                }
                <div>or</div> 
                <NavLink to={'/register'}>Sign up</NavLink>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        let obj = {
            email: formData.email,
            password: formData.password
        }
        props.login(obj)
    }

    if(props.isAuth) return <Redirect to={'/profile'}/>

    return (
        <div className={s.block}>
            <div className={s.title}>Login</div>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        submitting: isSubmitting('login')(state),
    }
}

export default connect(mapStateToProps, {login})(Login);