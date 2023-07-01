import { Card, Col, Pagination, Row, Select, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import truncate from '../../helpers/truncate';
import styles from './ProductList.module.scss';

const { Option } = Select;

export function ProductList({ list, onPageChange, currentPage, totalRow }) {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <div className={styles.main}>
      <div className={styles.productList}>
        <div className={styles.row}>
          <Row gutter={[18, 18]}>
            {list.map((product) => (
              <Link
                to={`/products/detail/${product.productId}`}
                key={product.productId}
              >
                <Col span={6}>
                  <Card
                    hoverable
                    style={{ width: 224 }}
                    cover={
                      <img
                        alt='product'
                        src={product.images[0]}
                        className={styles.card}
                      />
                    }
                  >
                    <Tooltip title={product.productName} placement='bottom'>
                      <div className={styles.detail}>
                        <div className={styles.name}>
                          {truncate(product.productName, 20)}
                        </div>
                        <h4 className={styles.price}>${product.price}.00</h4>
                      </div>
                    </Tooltip>
                  </Card>
                </Col>
              </Link>
            ))}
          </Row>
        </div>
      </div>
      <div className={styles.pagination}>
        <Pagination
          current={currentPage}
          total={totalRow}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
