import React from 'react';
import styles from './CartTable.module.scss';
import { InputNumber } from 'antd';

export function CartTable({ list, onRemove }) {
    let subTotal = 0;
    const transferFee = 2;
    let total = 0;

    if (list.length != 0) {
        subTotal = list.reduce((sum, item) => {
            return sum + item.subTotal;
        }, 0);

        total = subTotal + transferFee;
    }

    const handleRemove = (e) => {
        onRemove(e);

    };

    return (
        <div className={styles.container}>
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
                                            onClick={handleRemove}
                                            aria-current={item.productId}
                                            aria-setsize={item.size}
                                        ></i>
                                    </td>
                                    <td className={styles.product}>
                                        <img src={item.image} alt='' className={styles.img} />
                                        <div className={styles.name}>{item.name}</div>
                                    </td>
                                    <td className={styles.size}>{item.size}</td>
                                    <td className={`${styles.amountInput} amountInput`}>
                                        <InputNumber
                                            min={1}
                                            max={100}
                                            controls={false}
                                            defaultValue={item.amount}
                                            // onChange={handleAmountChange}
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
        </div>
    );
}
