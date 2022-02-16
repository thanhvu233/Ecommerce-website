import React from 'react';
import styles from './ExampleProduct.module.scss';
import img1 from '../../assets/images/category-1.jpg';
import img2 from '../../assets/images/category-2.jpg';
import img3 from '../../assets/images/category-3.jpg';

export function ExampleProduct() {
    return (
        <div className={styles.container}>
            <div className={styles.images}>
                <img src={img1} alt='img1' />
                <img src={img2} alt='img2' />
                <img src={img3} alt='img3' />
            </div>
        </div>
    );
}
