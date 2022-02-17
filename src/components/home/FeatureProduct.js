import { Card, Col, Rate, Row } from 'antd';
import React from 'react';
import styles from './FeatureProduct.module.scss';

export function FeatureProduct({ list, title }) {
    console.log(list);
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
                                            <div className={styles.name}>{product.productName}</div>
                                            <div className={styles.rating}>
                                                <Rate disabled defaultValue={product.rating} />
                                            </div>
                                            <h4 className={styles.price}>{product.price}</h4>
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
