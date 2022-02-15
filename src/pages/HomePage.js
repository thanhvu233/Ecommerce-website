import React from 'react';
import { Footer, Header } from '../components/common';
import { ExampleProduct, Hero, FeatureProduct, Comment, Logo } from '../components/home';

function HomePage() {
    return (
        <div>
            {/* Begin Header */}
            <Header current='men' />
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
            <Hero />
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
