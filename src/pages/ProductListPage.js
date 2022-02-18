import React from 'react';
import styles from '../components/common/_global.module.scss';
import { Header, Footer } from '../components/common';
import { ProductList, Sidebar, BreadcrumbSection } from '../components/productList';
import { useLocation } from 'react-router-dom';
import getParams from '../helpers/getParams';

function ProductListPage() {
    // Get params from URL
    const { pathname } = useLocation();

    let [type, category] = getParams(pathname);


    return (
        <div className={styles.wrapper}>
            {/* Header */}
            <Header />

            {/* Breadcrumb */}
            <BreadcrumbSection type={type} category={category} />

            {/* Sidebar */}
            <Sidebar />

            {/* ProductList */}
            <ProductList />

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default ProductListPage;
