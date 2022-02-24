import React from 'react';
import { LoginForm } from '.';
import styles from './Main.module.scss';
import heroImg from '../../assets/images/heroimg.png';

export function Main({initialValues, onSubmit}) {
    return (
        <div className={styles.darkBackground}>
            <div className={styles.main}>
                <div className={styles.loginImg}>
                    <img src={heroImg} alt='heroImg' />
                </div>
                <div className={styles.loginForm}>
                    <div className={styles.header}>Login</div>
                    <LoginForm initialValues={initialValues} onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    );
}
