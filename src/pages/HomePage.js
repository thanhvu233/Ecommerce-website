import React from 'react';
import { Footer, Header } from '../components/common';
import { ExampleProduct, Hero, FeatureProduct, Comment, Logo } from '../components/home';
import styles from '../components/common/_global.module.scss'

function HomePage() {
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
            <FeatureProduct />
            {/* End Feature Products Section */}

            {/* Begin Latest Products Section */}
            <FeatureProduct />
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
