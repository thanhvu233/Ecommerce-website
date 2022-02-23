import { Table, Tag, Space, InputNumber } from 'antd';
import React from 'react';
import styles from './CartTable.module.scss';
import './CartTable.scss';

const columns = [
    {
        title: 'Remove',
        key: 'remove',
        render: () => (
            <div className={styles.removeBtn}>
                <i class='las la-times'></i>
            </div>
        ),
    },
    {
        title: 'Product',
        dataIndex: 'product',
        key: 'product',
        render: (product) => (
            <div className={styles.product}>
                <img
                    src='https://bizweb.dktcdn.net/thumb/1024x1024/100/438/408/products/apm5355-trd-6.jpg?v=1641174453047'
                    alt=''
                    className={styles.img}
                />
                <div className={styles.name}>{product}</div>
            </div>
        ),
    },
    {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
        render: (size) => <div className={styles.size}>{size}</div>,
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        render: (quantity) => (
            <div className={`${styles.amountInput} amountInput`}>
                <InputNumber
                    min={1}
                    max={100}
                    controls={false}
                    defaultValue={quantity}
                    // onChange={handleAmountChange}
                />
            </div>
        ),
    },
    {
        title: 'Subtotal',
        key: 'subtotal',
        dataIndex: 'subtotal',
        render: (subtotal) => <div className={styles.subtotal}>{subtotal}</div>,
    },
];

const data = [
    {
        key: '1',
        product: "Men's Cafe Polo Shirt Coordinating Color",
        size: 'S',
        quantity: 2,
        subtotal: '$32.00',
    },
    {
        key: '2',
        product: "Men's Cafe Polo Shirt Coordinating Color",
        size: 'S',
        quantity: 2,
        subtotal: '$32.00',
    },
    {
        key: '3',
        product: "Men's Cafe Polo Shirt Coordinating Color",
        size: 'S',
        quantity: 2,
        subtotal: '$32.00',
    },
];

export function CartTable({ orderList }) {
    // console.log('orderList', orderList);

    return (
        <div className={styles.container}>
            <div className={styles.cartTable}>
                <div className={styles.header}>Cart</div>

                <div className={`${styles.detail} detail`}>
                    <Table columns={columns} dataSource={data} size='middle' pagination={false} />
                </div>

                <div className={styles.checkout}>
                    <div className={styles.title}>
                        <div>Subtotal:</div>
                        <div>Transport Fee:</div>
                        <div>Total:</div>
                    </div>
                    <div className={styles.payment}>
                        <div>$200.00</div>
                        <div>$35.00</div>
                        <div>$235.00</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
