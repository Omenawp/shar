import React from 'react';
import s from './FormControls.module.css';

export const FormControl = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
            <div className={hasError && s.error}>
                {props.children}
                {hasError ? <span className={s.errorMes}>{meta.error}</span> : ""}
            </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}></textarea></FormControl>
}

export const Input = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}></input></FormControl>
}