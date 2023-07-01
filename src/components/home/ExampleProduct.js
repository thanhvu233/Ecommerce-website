import React from 'react';
import { Zoom } from 'react-reveal';
import img1 from '../../assets/images/category-1.jpg';
import img2 from '../../assets/images/category-2.jpg';
import img3 from '../../assets/images/category-3.jpg';
import { Container } from '../common';
import styles from './ExampleProduct.module.scss';

export function ExampleProduct() {
  return (
    <Container>
      <Zoom delay={100} duration={3000}>
        <div className={styles.images}>
          <img src={img1} alt='img1' />
          <img src={img2} alt='img2' />
          <img src={img3} alt='img3' />
        </div>
      </Zoom>
    </Container>
  );
}
