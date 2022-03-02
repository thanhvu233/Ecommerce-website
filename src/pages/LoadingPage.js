import React from 'react';
import { Wrapper } from './../components/common';
import './LoadingPage.scss';
import styles from './LoadingPage.module.scss';

export default function LoadingPage() {
    return (
        <Wrapper>
            <div className={styles.loadingIcon}>
                <div class='loadingio-spinner-dual-ring-o9wjluh1pc'>
                    <div class='ldio-v6dp5yyfxi'>
                        <div></div>
                        <div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}
