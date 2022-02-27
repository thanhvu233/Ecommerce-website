import React from 'react';
import styles from '../components/common/_global.module.scss';
import './LoadingPage.scss';

export default function LoadingPage() {
    return (
        <div className={`${styles.wrapper} loadingIcon`}>
            <div class='loadingio-spinner-dual-ring-o9wjluh1pc'>
                <div class='ldio-v6dp5yyfxi'>
                    <div></div>
                    <div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
