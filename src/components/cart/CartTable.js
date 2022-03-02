import { InputNumber } from 'antd';
import React from 'react';
import { Container } from './../common';
import styles from './CartTable.module.scss';
import './CartTable.scss';

export function CartTable({ list, onRemove, onAmountChange }) {
    let subTotal = 0;
    const transferFee = 2;
    let total = 0;

    if (list.length != 0) {
        subTotal = list.reduce((sum, item) => {
            return sum + item.subTotal;
        }, 0);

        total = subTotal + transferFee;
    }

    const handleRemove = (item) => {
        onRemove(item);
    };

    const handleAmountChange = (product, e) => {
        onAmountChange(product, e.target.value);
    };

    return (
        <Container>
            <div className={styles.cartTable}>
                <div className={styles.header}>Cart</div>

                <div className={`${styles.detail} detail`}>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.tableHeader}>
                                <th>Remove</th>
                                <th>Product Name</th>
                                <th>Size</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item, idx) => (
                                <tr key={idx}>
                                    <td className={styles.removeBtn}>
                                        <i
                                            className={`las la-times`}
                                            onClick={() => handleRemove(item)}
                                        ></i>
                                    </td>
                                    <td className={styles.product}>
                                        <img src={item.image} alt='' className={styles.img} />
                                        <div className={styles.name}>{item.name}</div>
                                    </td>
                                    <td className={styles.size}>{item.size}</td>
                                    <td className={`${styles.amountInput} quantityInput`}>
                                        <InputNumber
                                            min={1}
                                            max={100}
                                            controls={false}
                                            value={item.amount}
                                            onPressEnter={(e) => handleAmountChange(item, e)}
                                            keyboard={false}
                                        />
                                    </td>
                                    <td className={styles.subtotal}>${item.subTotal}.00</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className={styles.checkout}>
                    <div className={styles.title}>
                        <div>Subtotal:</div>
                        <div>Transport Fee:</div>
                        <div>Total:</div>
                    </div>
                    <div className={styles.payment}>
                        <div>${subTotal}.00</div>
                        <div>${transferFee}.00</div>
                        <div>${total}.00</div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
