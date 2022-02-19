import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Footer, Header } from '../components/common';
import { BreadcrumbSection, ProductList, Sidebar } from '../components/productList';
import getParams from '../helpers/getParams';
import {
    fetchProductList,
    selectProductFilter,
    selectProductList
} from '../redux/slices/productSlice';
import styles from './ProductListPage.module.scss';

function ProductListPage() {
    // Get params from URL
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const filter = useSelector(selectProductFilter);
    const list = useSelector(selectProductList);

    let [type, category] = getParams(pathname);

    useEffect(() => {
        if (category) {
            dispatch(fetchProductList({ ...filter, _limit: 8, category: category, type: type }));
        } else if (!category && type != 'shoes') {
            dispatch(fetchProductList({ ...filter, _limit: 8, type: type }));
        } else if (type == 'shoes') {
            dispatch(fetchProductList({ ...filter, _limit: 8, category: type }));
        }
    }, [dispatch, filter, type, category]);

    return (
        <div className={styles.wrapper}>
            {/* Header */}
            <Header />

            {/* Breadcrumb */}
            <BreadcrumbSection type={type} category={category} />

            <div className={`${styles.main} ${styles.container}`}>
                {/* Sidebar */}
                <Sidebar />

                {/* ProductList */}
                <ProductList list={list} />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default ProductListPage;
