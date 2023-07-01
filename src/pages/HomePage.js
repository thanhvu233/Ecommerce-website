import { BackTop } from 'antd';
import React, { useEffect, useState } from 'react';
import heroImg from '../assets/images/heroimg.png';
import specialItem from '../assets/images/sneaker.png';
import { Footer, Header, Wrapper } from '../components/common';
import { Comment, ExampleProduct, FeatureProduct, Hero } from '../components/home';
import { fetchComment } from '../helpers/fetchComment';
import LoadingPage from './LoadingPage';
import productApi from '../API/productApi';
import { useDispatch } from 'react-redux';
import { setTotalUnpaidItems } from '../redux/slices/orderedItemSlice';
import orderedItemApi from './../API/orderedItemApi';

function HomePage() {
    const [item, setItem] = useState();
    const [comments, setComments] = useState([]);
    const [featureProductList, setFeatureProductList] = useState([]);
    const [latestProductList, setLatestProductList] = useState([]);

    const dispatch = useDispatch();

    useEffect(async () => {
        const featureProducts = await productApi.getFeatureProducts();
        setFeatureProductList(featureProducts.data.products);
        
        const latestProducts = await productApi.getLatestProducts();
        setLatestProductList(latestProducts.data.products);

        const product = await productApi.getSignatureProduct();
        setItem(product.data);

        const comments = await fetchComment();
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
            {/* Begin Header */}
            <Header />
            {/* End Header */}

            {latestProductList.length === 0 || featureProductList.length === 0 || comments.length === 0 || !item ? (
                <LoadingPage />
            ) : (
                <>
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
                    <FeatureProduct list={featureProductList} title='Featured Products' />
                    {/* End Feature Products Section */}

                    {/* Begin Latest Products Section */}
                    <FeatureProduct list={latestProductList} title='Latest Products' />
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
                </>
            )}

            {/* Begin Footer */}
            <Footer />
            {/* End Footer */}
            <BackTop>
                <div style={style}>
                    <i className='las la-angle-up'></i>
                </div>
            </BackTop>
        </Wrapper>
    );
}

export default HomePage;
