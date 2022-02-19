import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Footer, Header } from '../components/common';
import { BreadcrumbSection, ProductList, Sidebar } from '../components/productList';
import getParams from '../helpers/getParams';
import {
    fetchProductList,
    selectProductFilter,
    selectProductList,
    setFilter,
} from '../redux/slices/productSlice';
import styles from './ProductListPage.module.scss';

function ProductListPage() {
    // Get params from URL
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const filter = useSelector(selectProductFilter);
    const list = useSelector(selectProductList);

    let [type, category] = getParams(pathname);

    const handleChangePrice = (e) => {
        // Split value from String price
        const [minValue, maxValue] = e.target.value.split('.');

        // Goi API
        dispatch(
            setFilter({
                ...filter,
                _page: 1,
                price_gte: minValue,
                price_lte: maxValue,
            })
        );
    };

    const handleChangeRating = (e) => {
        // Goi API
        dispatch(
            setFilter({
                ...filter,
                _page: 1,
                rating: e.target.value,
            })
        );
    };

    const handleClear = () => {
        dispatch(
            setFilter({
                ...filter,
                _page: 1,
                price_gte: undefined,
                price_lte: undefined,
                rating: undefined,
            })
        );
    };

    const handleSelectChange = (field, order) => {
        dispatch(setFilter({ ...filter, _sort: field, _order: order }));
    };

    useEffect(() => {
        dispatch(fetchProductList({ ...filter, category: category || undefined, type: type }));
    }, [dispatch, filter, type, category]);

    return (
        <div className={styles.wrapper}>
            {/* Header */}
            <Header />

            {/* Breadcrumb */}
            <BreadcrumbSection type={type} category={category} />

            <div className={`${styles.main} ${styles.container}`}>
                {/* Sidebar */}
                <Sidebar
                    onChangePrice={handleChangePrice}
                    onChangeRating={handleChangeRating}
                    onClear={handleClear}
                />

                {/* ProductList */}
                <ProductList
                    list={list}
                    onSelectionChange={handleSelectChange}
                    type={type}
                    category={category}
                />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default ProductListPage;
