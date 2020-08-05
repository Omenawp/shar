import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { NavLink, Redirect } from 'react-router-dom';
import { Input } from '../common/FormControls/FormControls';
import { connect } from 'react-redux';
import s from '../Login/Login.module.css';
import { required } from '../../utils/validators';
import { register } from '../../redux/auth-reducer';


const SignupForm = (props) => {
    if(props.error == 0) return <Redirect to={'/login'} />

    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.formItem}>
                <div className={s.label}>Name</div>
                <Field component={Input} name="name" placeholder="name" validate={[required]} />
            </div>
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
                <button>Sign up</button> 
                <div>or</div> 
                <NavLink to={'/login'}>Log In</NavLink>
            </div>
        </form>
    )
}

const SignupReduxForm = reduxForm({form: 'signup'})(SignupForm);

const Signup = (props) => {
    const onSubmit = (formData) => {
        let obj = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        }
        props.register(obj);
    }

    if(props.isAuth) return <Redirect to={'/profile'} />

    return (
        <div className={s.block}>
            <div className={s.title}>Sign up</div>
            <SignupReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, { register })(Signup);
