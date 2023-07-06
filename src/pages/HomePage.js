import { BackTop } from 'antd';
import React, { useEffect, useState } from 'react';
import heroImg from '../assets/images/heroimg.png';
import specialItem from '../assets/images/sneaker.png';
import { Footer, Header, Wrapper } from '../components/common';
import {
  Comment,
  ExampleProduct,
  FeatureProduct,
  Hero,
} from '../components/home';
import LoadingPage from './LoadingPage';
import productApi from '../API/productApi';
import { useDispatch } from 'react-redux';
import { setTotalUnpaidItems } from '../redux/slices/orderedItemSlice';
import orderedItemApi from './../API/orderedItemApi';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import orderApi from '../API/orderApi';
import commentApi from '../API/commentApi';
import styles from './HomePage.module.scss';

function HomePage() {
  const [item, setItem] = useState();
  const [comments, setComments] = useState([]);
  const [featureProductList, setFeatureProductList] = useState([]);
  const [latestProductList, setLatestProductList] = useState([]);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(async () => {
    if (id) {
      const { data: updateOrderedItemResult } = await orderedItemApi.update({
        id,
        status: 'checkout',
      });

      const { data: updateOrderResult } = await orderApi.update({
        id,
        paymentMethod: 'credit-card',
        status: 'checkout',
      });

      if (updateOrderedItemResult && updateOrderResult) {
        Swal.fire({
          icon: 'success',
          title: 'Checkout Successfully',
          showConfirmButton: false,
          timer: 3000,
        });
      }
    }
  }, [id]);

  useEffect(async () => {
    const featureProducts = await productApi.getFeatureProducts();
    setFeatureProductList(featureProducts.data.products);

    const latestProducts = await productApi.getLatestProducts();
    setLatestProductList(latestProducts.data.products);

    const product = await productApi.getSignatureProduct();
    setItem(product.data);

    const { data: comments } = await commentApi.getAll();

    setComments(comments);

    const { data: unpaidItems } = await orderedItemApi.getAllUnpaidItems();

    dispatch(setTotalUnpaidItems(unpaidItems.length));

    // Scroll to top when navigate from other page
    window.scrollTo(0, 0);
  }, []);

  const style = {
    width: 50,
    height: 50,
    backgroundColor: '#157aea',
    fontSize: 20,
    borderRadius: 50,
    textAlign: 'center',
    color: '#fff',
    paddingTop: 10,
    transition: 'all 0.3 ease-in-out',
  };

  return (
    <Wrapper>
      <Header />

      {latestProductList.length === 0 ||
      featureProductList.length === 0 ||
      comments.length === 0 ||
      !item ? (
        <LoadingPage />
      ) : (
        <>
          <Hero
            imgPosition='right'
            title='Impress The World With Your Outfits'
            desc='Style is something each of us already has, all we need to do is find it.'
            image={heroImg}
          />
          <ExampleProduct />
          <FeatureProduct list={featureProductList} title='Featured Products' />
          <FeatureProduct list={latestProductList} title='Latest Products' />
          <Hero
            imgPosition='left'
            title={item.productName}
            desc={item.description}
            image={specialItem}
          />
          <Comment comments={comments} />
        </>
      )}

      <Footer />
      <BackTop className={styles.backTop}>
        <div style={style}>
          <i className='las la-angle-up'></i>
        </div>
      </BackTop>
    </Wrapper>
  );
}

export default HomePage;
