import { Button } from 'antd';
import React from 'react';
import styles from './PurchaseButton.module.scss';
import './PurchaseButton.scss';
import { Container } from './../common';

export function PurchaseButton({ onPurchase, loadingHandlePurchase }) {
  const handlePurchase = () => {
    onPurchase();
  };

  return (
    <Container>
      <div className={`${styles.purchaseBtn} purchaseBtn`}>
        <Button
          shape='round'
          size='large'
          onClick={handlePurchase}
          loading={loadingHandlePurchase}
        >
          Purchase
        </Button>
      </div>
    </Container>
  );
}
