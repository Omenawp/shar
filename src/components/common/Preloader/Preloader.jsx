import React from 'react';
import preloader from '../../../assets/preloader.svg';
import s from './Preloader.module.css';

let Preloader = () => {
    return <div className={s.wrapper}> 
        <img src={preloader} alt='' className={s.loader}/>
    </div>
}

export default Preloader;