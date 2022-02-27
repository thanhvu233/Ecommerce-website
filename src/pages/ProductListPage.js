import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Footer, Header } from '../components/common';
import { BreadcrumbSection, ProductList, Sidebar } from '../components/productList';
import getParams from '../helpers/getParams';
import {
    fetchProductList,
    selectProductFilter,
    selectProductList,
    selectProductLoading,
    selectProductTotalRow,
    setFilter
} from '../redux/slices/productSlice';
import LoadingPage from './LoadingPage';
import styles from './ProductListPage.module.scss';

function ProductListPage() {
    const [orderQuantity, setOrderQuantity] = useState(0);

    // Get params from URL
    const { pathname } = useLocation();

    const dispatch = useDispatch();
    const filter = useSelector(selectProductFilter);
    const list = useSelector(selectProductList);
    const totalRow = useSelector(selectProductTotalRow);
    // const loading = useSelector(selectProductLoading);

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

    const handlePageChange = (page) => {
        dispatch(setFilter({ ...filter, _page: page }));
    };

    // Sort, filter, pagination render
    useEffect(() => {
        dispatch(fetchProductList({ ...filter, category: category || undefined, type: type }));

        // Scroll to top when navigate from other page
        window.scrollTo(0, 0);
    }, [dispatch, filter]);

    // Dang trang 2 mà thay doi duong dan thì reset ve trang 1
    useEffect(() => {
        dispatch(
            setFilter({
                ...filter,
                _page: 1,
                category: category || undefined,
                type: type,
                price_gte: undefined,
                price_lte: undefined,
                rating: undefined,
            })
        );

        if (localStorage.getItem('quantity')) {
            setOrderQuantity(localStorage.getItem('quantity'));
        } else {
            setOrderQuantity(0);
        }

        // Scroll to top when navigate from other page
        window.scrollTo(0, 0);
    }, [category, type]);

    // if (loading) {
    //     return <LoadingPage />;
    // }

    return (
        <div className={styles.wrapper}>
            {/* Header */}
            <Header quantity={orderQuantity} />

            {/* Breadcrumb */}
            <BreadcrumbSection type={type} category={category} />

            <div className={`${styles.main} ${styles.container}`}>
                {/* Sidebar */}
                <Sidebar
                    onChangePrice={handleChangePrice}
                    onChangeRating={handleChangeRating}
                    onClear={handleClear}
                    type={type}
                    category={category}
                />

                {/* ProductList */}
                <ProductList
                    list={list}
                    onSelectionChange={handleSelectChange}
                    type={type}
                    category={category}
                    onPageChange={handlePageChange}
                    currentPage={filter._page}
                    totalRow={totalRow}
                />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default ProductListPage;
