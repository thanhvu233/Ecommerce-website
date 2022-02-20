import { Card, Col, Rate, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import truncate from './../../helpers/truncate';
import styles from './FeatureProduct.module.scss';

export function FeatureProduct({ list, title }) {
    return (
        <div className={styles.container}>
            <div className={styles.featureProduct}>
                {/* Title */}
                <div className={styles.heading}>{title}</div>

                {/* Feature Product List */}
                <div className={styles.featureList}>
                    <div className={styles.row}>
                        <Row gutter={[24, 48]}>
                            {list.map((product) => (
                                <Link to={`/products/detail/${product.productId}`}>
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
                                                <h4 className={styles.price}>
                                                    ${product.price}.00
                                                </h4>
                                            </div>
                                        </Card>
                                    </Col>
                                </Link>
                            ))}
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
}
