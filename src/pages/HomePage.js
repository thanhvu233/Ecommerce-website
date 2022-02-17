import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import heroImg from '../assets/images/heroimg.png';
import specialItem from '../assets/images/sneaker.png';
import { Footer, Header } from '../components/common';
import styles from '../components/common/_global.module.scss';
import { Comment, ExampleProduct, FeatureProduct, Hero, Logo } from '../components/home';
import {
    fetchProductList,
    selectProductFilter,
    selectProductList,
} from '../redux/slices/productSlice';
import productApi from './../API/productApi';
import commentApi from './../API/commentApi';

function HomePage() {
    const dispatch = useDispatch();
    const productList = useSelector(selectProductList);
    const filter = useSelector(selectProductFilter);

    const [item, setItem] = useState({});
    const [comments, setComments] = useState([]);

    const fetchProductById = async (productId) => {
        try {
            const data = await productApi.getById(productId);

            setItem(data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchComment = async () => {
        try {
            const data = await commentApi.getAll();

            setComments(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        dispatch(
            fetchProductList({ ...filter, _limit: 16, category: 'shirt', type_like: 'men|women' })
        );

        fetchProductById('2e5b5a37-6e52-4263-87d4-c8c84aab8cb8');
        fetchComment();
    }, [dispatch]);

    const featureList = productList.slice(0, 4);
    const latestList = productList.slice(8, 16);


    return (
        <div className={styles.wrapper}>
            {/* Begin Header */}
            <Header />
            {/* End Header */}

            {/* Begin Hero Section */}
            <Hero
                imgPosition='right'
                title='Impress The World With Your Outfits'
                desc='Style is something each of us already has, all we need to do is find it.'
                image={heroImg}
            />
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
            <Hero
                imgPosition='left'
                title={item.productName}
                desc={item.description}
                image={specialItem}
            />
            {/* End Unique Prodcut Section */}

            {/* Begin Comments Section */}
            <Comment comments={comments} />
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
