import { InputNumber } from 'antd';
import React from 'react';
import styles from './CartTable.module.scss';
import './CartTable.scss';

export const SmallCartTable = ({
  orderedItems,
  handleAmountChange,
  handleRemove,
}) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.tableHeader}>
          <th>Remove</th>
          <th>Product Detail</th>
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
              <div className={styles.size}>
                Size: <span className={styles.smallSizeText}>{item.size}</span>
              </div>
              <div className={styles.subtotal}>${item.subTotal}.00</div>
              <div className={`${styles.amountInput} quantityInput`}>
                <InputNumber
                  min={1}
                  max={100}
                  value={item.amount}
                  onChange={(value) => handleAmountChange(item.product, value)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
