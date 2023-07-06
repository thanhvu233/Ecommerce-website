import { Radio, Space } from 'antd';
import React from 'react';
import { Container } from './../common';
import styles from './PaymentMethod.module.scss';
import './PaymentMethod.scss';

export function PaymentMethod({ paymentMethod, onPaymentMethodChange }) {
  const handleChangeMethod = (e) => {
    onPaymentMethodChange(e.target.value);
  };

  return (
    <Container>
      <div className={styles.paymentMethod}>
        <div className={styles.header}>Payment Method:</div>
        <Radio.Group
          onChange={handleChangeMethod}
          value={paymentMethod}
          className={`${styles.paymentOtps} paymentOtps`}
        >
          <Space direction='vertical'>
            <Radio value='cod'>
              <div className={styles.icon}>
                <img src='https://img.icons8.com/external-smashingstocks-circular-smashing-stocks/65/000000/external-cash-on-delivery-shopping-and-commerce-activities-smashingstocks-circular-smashing-stocks.png' />
              </div>
              <div className={styles.method}>Cash on delivery</div>
            </Radio>
            <Radio value='credit-card'>
              <div className={styles.icon}>
                <img src='https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/64/000000/external-credit-card-gas-station-xnimrodx-lineal-color-xnimrodx.png' />
              </div>
              <div className={styles.method}>Payment by credit card</div>
            </Radio>
          </Space>
        </Radio.Group>
      </div>
    </Container>
  );
}
