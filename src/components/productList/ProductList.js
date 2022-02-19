import React, { useEffect, useState } from 'react';
import styles from './ProductList.module.scss';
import { Card, Col, Row, Select } from 'antd';
import truncate from '../../helpers/truncate';
import { Pagination } from 'antd';

const { Option } = Select;

export function ProductList({ list, onSelectionChange, type, category, onPageChange, currentPage }) {
    const [selectValue, setSelectValue] = useState('');

    // Count totalPage;
    let totalItem = 0;
    // /men, /women, /shoes
    if (!category && type != 'kids') {
        totalItem = 16;
    }
    // /kids
    else if (!category && type == 'kids') {
        totalItem = 8;
    }
    // Other cases
    else {
        totalItem = 8;
    }

    const handleSelectChange = (value) => {
        // Split field and _order from value
        const [field, order] = value.split('.');

        onSelectionChange(field, order);

        setSelectValue(value);
    };

    const handlePageChange = (page) => {
        onPageChange(page);
    };

    useEffect(() => {
        setSelectValue('');
    }, [type, category]);

    return (
        <div className={styles.main}>
            <div className={styles.dropdown}>
                <span className={styles.text}>Sort by</span>
                <Select
                    defaultValue=''
                    style={{ width: 200 }}
                    size='large'
                    onChange={handleSelectChange}
                    value={selectValue}
                >
                    <Option value=''>Default</Option>
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
                                            {truncate(product.productName, 20)}
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
                <Pagination current={currentPage} total={totalItem} onChange={handlePageChange} />
            </div>
        </div>
    );
}
