import React from 'react';
import styles from './RelatedProduct.module.scss';
import { Link } from 'react-router-dom';
import { Card, Col, Rate, Row, Tooltip } from 'antd';
import truncate from '../../helpers/truncate';
import { Container } from './../common';

export function RelatedProduct({ list, item }) {
  return (
    <Container>
      <div className={styles.relatedProduct}>
        <div className={styles.title}>
          <span>Related Products</span>
          <span>
            <Link to={`/products/${item.type}/${item.category}`}>
              View More
            </Link>
          </span>
        </div>

        <div className={styles.productList}>
          <div className={styles.row}>
            <Row gutter={[24, 48]} justify='space-between'>
              {list.map((product) => (
                <Link
                  to={`/products/detail/${product.productId}`}
                  key={product.productId}
                >
                  <Col span={6}>
                    <Card
                      className={styles.cardItem}
                      hoverable
                      cover={
                        <img
                          alt='product'
                          src={product.images[0]}
                          className={styles.card}
                        />
                      }
                    >
                      <div className={styles.detail}>
                        <Tooltip title={product.productName} placement='bottom'>
                          <div className={styles.name}>
                            {truncate(product.productName, 44)}
                          </div>
                          <div className={styles.rating}>
                            <Rate disabled defaultValue={product.rating} />
                          </div>
                          <h4 className={styles.price}>${product.price}.00</h4>
                        </Tooltip>
                      </div>
                    </Card>
                  </Col>
                </Link>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </Container>
  );
}
