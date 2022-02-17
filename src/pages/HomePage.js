import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Footer, Header } from '../components/common';
import styles from '../components/common/_global.module.scss';
import { Comment, ExampleProduct, FeatureProduct, Hero, Logo } from '../components/home';
import {
    fetchProductList,
    selectProductFilter,
    selectProductList,
} from '../redux/slices/productSlice';
import { makeRandomNumber } from './../helpers/randomNumber';

function HomePage() {
    const dispatch = useDispatch();
    const productList = useSelector(selectProductList);
    const filter = useSelector(selectProductFilter);

    useEffect(() => {
        dispatch(
            fetchProductList({ ...filter, _limit: 16, category: 'shirt', type_like: 'men|women' })
        );
    }, [dispatch, filter]);

    // console.log(productList);

    const featureList = productList.slice(0, 4);
    const latestList = productList.slice(8, 16);

    console.table(featureList);
    console.table(latestList);

    return (
        <div className={styles.wrapper}>
            {/* Begin Header */}
            <Header />
            {/* End Header */}

            {/* Begin Hero Section */}
            <Hero />
            {/* End Hero Section */}

            {/* Begin Example Products Section */}
            <ExampleProduct />
            {/* End Example Products Section */}

            {/* Begin Feature Products Section */}
            <FeatureProduct list={featureList} title='Featured Products' />
            {/* End Feature Products Section */}

            {/* Begin Latest Products Section */}
            <FeatureProduct list={latestList} title='Latest Products' />
            {/* End Latest Products Section */}

            {/* Begin Unique Product Section */}
            {/* <Hero /> */}
            {/* End Unique Prodcut Section */}

            {/* Begin Comments Section */}
            <Comment />
            {/* End Comments Section */}

            {/* Begin Logo Section */}
            <Logo />
            {/* End Logo Section */}

            {/* Begin Footer */}
            <Footer />
            {/* End Footer */}
        </div>
    );
}

export default HomePage;
