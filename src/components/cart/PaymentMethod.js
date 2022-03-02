import { Radio, Space } from 'antd';
import React, { useState } from 'react';
import { Container } from './../common';
import styles from './PaymentMethod.module.scss';
import './PaymentMethod.scss';

export function PaymentMethod() {
    const [method, setMethod] = useState('cod');

    const handleChangeMethod = (e) => {
        setMethod(e.target.value);
    };

    return (
        <Container>
            <div className={styles.paymentMethod}>
                <div className={styles.header}>Payment Method:</div>
                <Radio.Group
                    onChange={handleChangeMethod}
                    value={method}
                    className={`${styles.paymentOtps} paymentOtps`}
                >
                    <Space direction='vertical'>
                        <Radio value='cod'>
                            <div className={styles.icon}>
                                <img src='https://img.icons8.com/external-smashingstocks-circular-smashing-stocks/65/000000/external-cash-on-delivery-shopping-and-commerce-activities-smashingstocks-circular-smashing-stocks.png' />
                            </div>
                            <div className={styles.method}>Cash On Delivery</div>
                        </Radio>
                        <Radio value='viettel'>
                            <div className={styles.icon}>
                                <img src='https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-viettelmoney.png' />
                            </div>
                            <div className={styles.method}>Payment by Viettel Money</div>
                        </Radio>
                        <Radio value='momo'>
                            <div className={styles.icon}>
                                <img src='https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-momo.svg' />
                            </div>
                            <div className={styles.method}>Payment by Momo</div>
                        </Radio>
                        <Radio value='zalopay'>
                            <div className={styles.icon}>
                                <img src='https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-zalo-pay.svg' />
                            </div>
                            <div className={styles.method}>Payment by ZaloPay</div>
                        </Radio>
                        <Radio value='atm'>
                            <div className={styles.icon}>
                                <img src='https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/64/000000/external-credit-card-gas-station-xnimrodx-lineal-color-xnimrodx.png' />
                            </div>
                            <div className={styles.method}>Payment by Domestic ATM card</div>
                        </Radio>
                        <Radio value='visa'>
                            <div className={styles.icon}>
                                <img src='https://img.icons8.com/color/48/000000/visa.png' />
                            </div>
                            <div className={styles.method}>Payment by Visa Card</div>
                        </Radio>
                    </Space>
                </Radio.Group>
            </div>
        </Container>
    );
}
