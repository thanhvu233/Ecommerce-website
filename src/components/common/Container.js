import React from 'react';
import styles from './Container.module.scss';

export function Container(props) {
    return (
        <div className={styles.container}>
            {props.children}
        </div>
    )
}
