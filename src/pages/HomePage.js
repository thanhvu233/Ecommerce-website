import { BackTop } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import heroImg from '../assets/images/heroimg.png';
import specialItem from '../assets/images/sneaker.png';
import { Footer, Header, Wrapper } from '../components/common';
import { Comment, ExampleProduct, FeatureProduct, Hero } from '../components/home';
import { fetchComment } from '../helpers/fetchComment';
import { fetchProductById } from '../helpers/fetchProductById';
import {
    fetchProductList,
    selectProductList,
    selectProductLoading
} from '../redux/slices/productSlice';
import LoadingPage from './LoadingPage';
import equal from 'fast-deep-equal/react';

function HomePage() {
    const [item, setItem] = useState({});
    const [comments, setComments] = useState([]);
    const [orderQuantity, setOrderQuantity] = useState(0);

    const dispatch = useDispatch();
    const productList = useSelector(selectProductList);
    const loading = useSelector(selectProductLoading);

  const featureList = useMemo(() => productList.slice(0, 4), [productList]);
  const latestList = useMemo(() => productList.slice(8, 16), [productList]);

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

    useEffect(async () => {
        dispatch(
            fetchProductList({ _page: 1, _limit: 16, category: 'shirt', type_like: 'men|women' })
        );

        const product = await fetchProductById('2e5b5a37-6e52-4263-87d4-c8c84aab8cb8');
        setItem(product[0]);

        const comment = await fetchComment();
        setComments(comment);

        if (localStorage.getItem('quantity')) {
            await setOrderQuantity(localStorage.getItem('quantity'));
        } else {
            await setOrderQuantity(0);
        }

        // Scroll to top when navigate from other page
        window.scrollTo(0, 0);
    }, [dispatch]);

    if (loading) {
        return <LoadingPage />;
    } else {
        return (
            <Wrapper>
                {/* Begin Header */}
                <Header quantity={orderQuantity} />
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

                {/* Begin Footer */}
                <Footer />
                {/* End Footer */}
                <BackTop>
                    <div style={style}>
                        <i class='las la-angle-up'></i>
                    </div>
                </BackTop>
            </Wrapper>
        );
    }
}

export default HomePage;
