import React from 'react';
import styles from './Wrapper.module.scss';

export function Wrapper(props) {
  return <div className={styles.wrapper}>{props.children}</div>;
}
