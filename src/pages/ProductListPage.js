import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Container, Footer, Header, Wrapper } from '../components/common';
import {
  BreadcrumbSection,
  ProductList,
  Sidebar,
} from '../components/productList';
import getParams from '../helpers/getParams';
import {
  fetchProductList,
  selectProductFilter,
  selectProductList,
  selectProductLoading,
  selectProductTotalRow,
  setFilter,
} from '../redux/slices/productSlice';
import styles from './ProductListPage.module.scss';
import LoadingPage from './LoadingPage';
import { SortingFilter } from '../components/productList/SortingFilter';
import orderedItemApi from '../API/orderedItemApi';
import { setTotalUnpaidItems } from '../redux/slices/orderedItemSlice';

function ProductListPage() {
  // Get params from URL
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const filter = useSelector(selectProductFilter);
  const list = useSelector(selectProductList);
  const totalRow = useSelector(selectProductTotalRow);
  const loading = useSelector(selectProductLoading);

  let [type, category] = getParams(pathname);

  // Sort, filter, pagination render
  useEffect(async () => {
    dispatch(
      fetchProductList({
        ...filter,
        category: category || undefined,
        type: type,
      })
    );

    const { data: unpaidItems } = await orderedItemApi.getAllUnpaidItems();

    dispatch(setTotalUnpaidItems(unpaidItems.length));

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
        'price[gte]': undefined,
        'price[lte]': undefined,
        rating: undefined,
      })
    );

    // Scroll to top when navigate from other page
    window.scrollTo(0, 0);
  }, [category, type]);

  const handleChangePrice = (e) => {
    // Split value from String price
    const [minValue, maxValue] = e.target.value.split('.');

    // Goi API
    dispatch(
      setFilter({
        ...filter,
        _page: 1,
        'price[gte]': minValue,
        'price[lte]': maxValue,
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
        'price[gte]': undefined,
        'price[lte]': undefined,
        rating: undefined,
      })
    );
  };

  const handleSelectChange = (field, order) => {
    dispatch(
      setFilter({
        ...filter,
        sort: `${order === 'desc' ? '-' : ''}${field}`,
      })
    );
  };

  const handlePageChange = (page) => {
    dispatch(setFilter({ ...filter, _page: page }));
  };

  return (
    <Wrapper>
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <BreadcrumbSection type={type} category={category} />

      <Container>
        <div className={styles.main}>
          {/* Sidebar */}
          <Sidebar
            onChangePrice={handleChangePrice}
            onChangeRating={handleChangeRating}
            onClear={handleClear}
            type={type}
            category={category}
          />

          <div className={styles.list}>
            <SortingFilter
              onSelectionChange={handleSelectChange}
              type={type}
              category={category}
            />

            {loading ? (
              <LoadingPage />
            ) : list.length > 0 ? (
              <ProductList
                list={list}
                onPageChange={handlePageChange}
                currentPage={filter._page}
                totalRow={totalRow}
              />
            ) : (
              <h3 className={styles.noResultText}>No results</h3>
            )}
          </div>
        </div>
      </Container>

      {/* Footer */}
      <Footer />
    </Wrapper>
  );
}

export default ProductListPage;
