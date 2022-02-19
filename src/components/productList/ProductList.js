import React from 'react';
import styles from './ProductList.module.scss';
import { Card, Col, Row, Select } from 'antd';
import truncate from '../../helpers/truncate';
import { Pagination } from 'antd';

const { Option } = Select;

export function ProductList({ list }) {
    return (
        <div className={styles.main}>
            <div className={styles.dropdown}>
                <span className={styles.text}>Sort by</span>
                <Select defaultValue='default' style={{ width: 200 }} size='large'>
                    <Option value='default'>Default</Option>
                    <Option value='name.asc'>Name ASC</Option>
                    <Option value='name.desc'>Name DESC</Option>
                    <Option value='price.asc'>Price ASC</Option>
                    <Option value='price.desc'>Price DESC</Option>
                    <Option value='rating.asc'>Rating ASC</Option>
                    <Option value='rating.desc'>Rating DESC</Option>
                </Select>
            </div>
            <div className={styles.productList}>
                <div className={styles.row}>
                    <Row gutter={[18, 18]}>
                        {list.map((product) => (
                            <Col span={6} key={product.productId}>
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
                                    <div className={styles.detail}>
                                        <div className={styles.name}>
                                            {truncate(product.productName, 44)}
                                        </div>
                                        <h4 className={styles.price}>${product.price}.00</h4>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
            <div className={styles.pagination}>
                <Pagination defaultCurrent={1} defaultPageSize={8} total={list.length} />
            </div>
        </div>
    );
}
