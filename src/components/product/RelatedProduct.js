import React from 'react';
import styles from './RelatedProduct.module.scss';
import { Link } from 'react-router-dom';
import { Card, Col, Rate, Row } from 'antd';
import truncate from '../../helpers/truncate';

export function RelatedProduct({ list, item }) {
    return (
        <div className={styles.container}>
            <div className={styles.relatedProduct}>
                <div className={styles.title}>
                    <span>Related Products</span>
                    <span>
                        <Link to={`/products/${item.type}/${item.category}`}>View More</Link>
                    </span>
                </div>

                <div className={styles.productList}>
                    <div className={styles.row}>
                        <Row gutter={[24, 48]}>
                            {list.map((product) => (
                                <Col span={6} key={product.productId}>
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
                            ))}
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
}
