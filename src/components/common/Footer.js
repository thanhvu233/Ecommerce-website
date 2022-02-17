import React from 'react';
import appStore from '../../assets/images/app-store.png';
import logo from '../../assets/images/logo-white.png';
import playStore from '../../assets/images/play-store.png';
import styles from './Footer.module.scss';

export function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.col}>
                <p className={styles.heading}>Download Our App</p>
                <p className={styles.desc}>Download App for Android and IOS mobile phone.</p>
                <div className={styles.appImg}>
                    <img src={playStore} alt='playStore' />
                    <img src={appStore} alt='appStore' />
                </div>
            </div>

            <div className={styles.col}>
                <div className={styles.logoImg}>
                    <img src={logo} alt='logo' />
                </div>
                <p className={styles.desc}>
                    Our purpose is to sustainably make the pleasure and benefits of Outfits
                    Accessible to the many.
                </p>
            </div>

            <div className={styles.col}>
                <p className={styles.linkHeading}>Useful Links</p>
                <div>
                    <ul>
                        <li className={styles.link}>Coupons</li>
                        <li className={styles.link}>Blog Post</li>
                        <li className={styles.link}>Return Policy</li>
                        <li className={styles.link}>Join Affiliate</li>
                    </ul>
                </div>
            </div>

            <div className={styles.col}>
                <p className={styles.linkHeading}>Follow Us</p>
                <div>
                    <ul>
                        <li className={styles.link}>Facebook</li>
                        <li className={styles.link}>Twister</li>
                        <li className={styles.link}>Instagram</li>
                        <li className={styles.link}>Youtube</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
