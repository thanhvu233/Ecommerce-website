import { InputNumber } from 'antd';
import React from 'react';
import { Container } from './../common';
import styles from './CartTable.module.scss';
import './CartTable.scss';
import { useSelector } from 'react-redux';
import { selectUnpaidItemList } from '../../redux/slices/orderedItemSlice';
import { useMemo } from 'react';

const TRANSPORT_FEE = 2;

export function CartTable({ onRemove, onAmountChange }) {
    const orderedItems = useSelector(selectUnpaidItemList);

    const total = useMemo(() => {
        if (orderedItems.length !== 0) {
            const subTotal = orderedItems.reduce((sum, item) => {
                return sum + item.subTotal;
            }, 0);

            return subTotal + TRANSPORT_FEE;
        }

        return 0;
    }, [orderedItems]);

    const handleRemove = (item) => {
        onRemove(item);
    };

    const handleAmountChange = (product, amount) => {
        onAmountChange(product, amount);
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
                            {orderedItems.map((item, idx) => (
                                <tr key={idx}>
                                    <td className={styles.removeBtn}>
                                        <i
                                            className={`las la-times`}
                                            onClick={() => handleRemove(item)}
                                        ></i>
                                    </td>
                                    <td className={styles.product}>
                                        <img src={item.product.images[0]} alt='' className={styles.img} />
                                        <div className={styles.name}>{item.product.productName}</div>
                                    </td>
                                    <td className={styles.size}>{item.size}</td>
                                    <td className={`${styles.amountInput} quantityInput`}>
                                        <InputNumber
                                            min={1}
                                            max={100}
                                            value={item.amount}
                                            onChange={(value) => handleAmountChange(item.product, value)}
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
                        <div>${total - TRANSPORT_FEE > 0 ? total - TRANSPORT_FEE : "0"}.00</div>
                        <div>${TRANSPORT_FEE}.00</div>
                        <div>${total}.00</div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
