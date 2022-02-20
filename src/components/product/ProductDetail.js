import React, { useState } from 'react';
import styles from './ProductDetail.module.scss';
import './ProductDetail.scss';
import { Button, InputNumber, Radio } from 'antd';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper';

export function ProductDetail({ product }) {
    const [size, setSize] = useState('S');
    const [amount, setAmount] = useState(1);

    const options = [
        { label: 'S', value: 'S' },
        { label: 'M', value: 'M' },
        { label: 'L', value: 'L' },
        { label: 'XL', value: 'XL' },
    ];

    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    const handleAmountChange = (value) => {
        setAmount(value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.productDetail}>
                <div className={styles.imgList}>
                    <div className={styles.mainImg}>
                        <img src={product?.images[0]} alt='mainImg' />
                    </div>

                    {/* <div className={styles.otherImg}>
                        {product?.images.map((image, idx) => (
                            <div key={idx} className={styles.imgItem}>
                                <img src={image} alt={`img${idx}`} />
                            </div>
                        ))}
                    </div> */}
                    <div className={`${styles.otherImg} otherImg`}>
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={4}
                            slidesPerGroup={4}
                            loop={true}
                            loopFillGroupWithBlank={true}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation]}
                            className='mySwiper'
                        >
                            {product?.images.map((image, idx) => (
                                <SwiperSlide key={idx} className={styles.imgItem}>
                                    <img src={image} alt={`img${idx}`} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                <div className={styles.detail}>
                    <div className={styles.name}>{product.productName}</div>
                    <div className={styles.price}>${product.price}.00</div>
                    <div className={styles.size}>
                        <div className={styles.sizeText}>
                            Size:
                            <span>{size ? `${size}` : ''}</span>
                        </div>

                        <div className={`${styles.sizeOpts} sizeOpts`}>
                            <Radio.Group
                                options={options}
                                optionType='button'
                                onChange={handleSizeChange}
                                value={size}
                            ></Radio.Group>
                        </div>
                    </div>
                    <div className={styles.amount}>
                        <div className={styles.amountText}>
                            Amount:
                            <span>{amount ? `${amount}` : ''}</span>
                        </div>
                        <div className={`${styles.amountInput} amountInput`}>
                            <InputNumber
                                min={1}
                                max={100}
                                controls={false}
                                defaultValue={1}
                                onChange={handleAmountChange}
                            />
                        </div>
                    </div>
                    <div className={styles.desc}>
                        <div>PRODUCT DETAILS</div>
                        <p>{product.description}</p>
                    </div>
                    <div className={`${styles.button} buyBtn`}>
                        <Button shape='round' size='large'>
                            Add To Cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
