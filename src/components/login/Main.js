import React from 'react';
import { LoginForm } from '.';
import styles from './Main.module.scss';
import heroImg from '../../assets/images/heroimg.png';
import { Zoom } from 'react-reveal';

export function Main({ initialValues, onSubmit }) {
  return (
    <div className={styles.darkBackground}>
      <div className={styles.main}>
        <Zoom delay={100} duration={3000}>
          <div className={styles.loginImg}>
            <img src={heroImg} alt='heroImg' />
          </div>
          <div className={styles.loginForm}>
            <div className={styles.header}>Login</div>
            <LoginForm initialValues={initialValues} onSubmit={onSubmit} />
          </div>
        </Zoom>
      </div>
    </div>
  );
}
