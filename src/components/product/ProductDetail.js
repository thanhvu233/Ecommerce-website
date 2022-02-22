import { Button, InputNumber, Radio } from 'antd';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// import required modules
import { Navigation, Pagination } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './ProductDetail.module.scss';
import './ProductDetail.scss';
import Magnifier from 'react-magnifier';

export function ProductDetail({ product, onGetOrder }) {
    const [srcImg, setSrcImg] = useState(product.images[0]);
    const [size, setSize] = useState('S');
    const [amount, setAmount] = useState(1);

    const history = useHistory();
    const { pathname } = useLocation();

    const options = [
        { label: 'S', value: 'S' },
        { label: 'M', value: 'M' },
        { label: 'L', value: 'L' },
        { label: 'XL', value: 'XL' },
    ];

    const handleSelectImg = (e) => {
        setSrcImg(e.target.currentSrc);
    };

    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    const handleAmountChange = (value) => {
        setAmount(value);
    };

    const handleAddCart = () => {
        // a. NOT LOGINED
        if (!Boolean(localStorage.getItem('access_token'))) {
            // Store current URL on localStorage
            localStorage.setItem('path', pathname);

            // Navigate to Login Page
            history.push('/login');

            // After logining successfully, navigate back to Product Page
            // User has to press ADD TO CART again
        }

        // b. LOGINED
        else {
            const item = {
                productId: product.productId,
                amount: amount,
                size: size,
            };

            // Get an order which isn't finished and has this currentProduct, of user from DB (Call API)
            onGetOrder(item);

            // 1. IF ALL ORDERS ARE FINISHED
            // -   Create new order and add currentProduct in it (Call API)
            // 2. IF THERE IS AN UNFINISHED ORDER AND THAT ORDER CONTAINS THIS CURRENT PRODUCT
            // -   Update amount of currentProduct (Call API)
            // -   Update badge on cart icon on Header
            // 3. IF THERE IS AN UNFINISHED ORDER AND THAT ORDER DOESN'T CONTAIN THIS CURRENT PRODUCT
            // -   Add this currentProduct to that order (Call API)
            // -   Update badge on cart icon on Header
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.productDetail}>
                <div className={styles.imgList}>
                    <div className={`${styles.mainImg} mainImg`}>
                        <Magnifier
                            src={srcImg ? srcImg : product.images[0]}
                            alt='mainImg'
                            mgWidth={130}
                            mgHeight={130}
                            mgBorderWidth={0}
                        />
                    </div>

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
                                    <img src={image} alt={`img${idx}`} onClick={handleSelectImg} />
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
                    <div className={`${styles.button} buyBtn`} onClick={handleAddCart}>
                        <Button shape='round' size='large'>
                            Add To Cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
