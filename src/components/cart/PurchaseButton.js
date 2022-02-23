import { Button } from 'antd';
import React from 'react';
import styles from './PurchaseButton.module.scss';
import './PurchaseButton.scss';

export function PurchaseButton() {
    return (
        <div className={styles.container}>
            <div className={`${styles.purchaseBtn} purchaseBtn`}>
                <Button shape='round' size='large'>
                    Purchase
                </Button>
            </div>
        </div>
    );
}
