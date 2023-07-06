import { Card, Col, Rate, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import truncate from './../../helpers/truncate';
import { Container } from './../common';
import styles from './FeatureProduct.module.scss';

export function FeatureProduct({ list, title }) {
  return (
    <Container>
      <div className={styles.featureProduct}>
        {/* Title */}
        <div className={styles.heading}>{title}</div>

        {/* Feature Product List */}
        <div className={styles.featureList}>
          <div>
            <Row gutter={[8, 24]} className={styles.row}>
              {list.map((product) => (
                <Link
                  to={`/products/detail/${product.productId}`}
                  key={product.productId}
                >
                  <Col span={6}>
                    <Card
                      hoverable
                      style={{ width: 280 }}
                      cover={
                        <img
                          alt='product'
                          src={product.images[0]}
                          className={styles.card}
                        />
                      }
                    >
                      <div className={styles.detail}>
                        <div className={styles.name}>
                          {truncate(product.productName, 44)}
                        </div>
                        <div className={styles.rating}>
                          <Rate disabled defaultValue={product.rating} />
                        </div>
                        <h4 className={styles.price}>${product.price}.00</h4>
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
