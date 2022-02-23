import { Button, Radio, Rate, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.scss';
import './Sidebar.scss';

export function Sidebar({ onChangePrice, onChangeRating, onClear, type, category }) {
    const [price, setPrice] = useState('');
    const [rating, setRating] = useState(0);

    const [isFilter, setIsFilter] = useState(false);

    const handleChangePrice = (e) => {
        onChangePrice(e);

        setPrice(e.target.value);
        setIsFilter(true);
    };

    const handleChangeRating = (e) => {
        onChangeRating(e);

        setRating(e.target.value);
        setIsFilter(true);
    };

    const handleClear = () => {
        onClear();

        setPrice('');
        setRating('');
        setIsFilter(false);
    };

    // Đường dẫn thay đổi thì set lại filter price và rating
    useEffect(() => {
        setPrice('');
        setRating('');
    }, [type, category]);

    return (
        <div className={`${styles.sidebar} sidebar`}>
            <div className={styles.price}>
                <div>
                    <h3>Price</h3>
                    <Radio.Group onChange={handleChangePrice} value={price}>
                        <Space direction='vertical'>
                            <Radio value='30.60'>$30 - $60</Radio>
                            <Radio value='60.90'>$60 - $90</Radio>
                            <Radio value='90.120'>$90 - $120</Radio>
                            <Radio value='120.150'>$120 - $150</Radio>
                        </Space>
                    </Radio.Group>
                </div>

                <div
                    className={
                        isFilter ? `${styles.clearBtn} ${styles.show}` : `${styles.clearBtn}`
                    }
                >
                    <Button onClick={handleClear}>Clear</Button>
                </div>
            </div>
            <div className={styles.rating}>
                <h3>Rating</h3>
                <Radio.Group onChange={handleChangeRating} value={rating}>
                    <Space direction='vertical'>
                        <Radio value={1}>
                            <Rate disabled defaultValue={1} />
                        </Radio>
                        <Radio value={2}>
                            <Rate disabled defaultValue={2} />
                        </Radio>
                        <Radio value={3}>
                            <Rate disabled defaultValue={3} />
                        </Radio>
                        <Radio value={4}>
                            <Rate disabled defaultValue={4} />
                        </Radio>
                        <Radio value={5}>
                            <Rate disabled defaultValue={5} />
                        </Radio>
                    </Space>
                </Radio.Group>
            </div>
        </div>
    );
}
