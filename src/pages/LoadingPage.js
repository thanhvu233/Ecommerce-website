import React from 'react';
import { Wrapper } from './../components/common';
import './LoadingPage.scss';
import styles from './LoadingPage.module.scss';

export default function LoadingPage() {
    return (
        <Wrapper>
            <div className={styles.loadingIcon}>
                <div className='loadingio-spinner-dual-ring-o9wjluh1pc'>
                    <div className='ldio-v6dp5yyfxi'>
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
