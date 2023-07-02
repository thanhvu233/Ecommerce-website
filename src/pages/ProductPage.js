import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Footer, Header, Wrapper } from '../components/common';
import { ProductDetail, RelatedProduct } from './../components/product/';
import {
  fetchProductList,
  selectProductList,
  selectProductLoading,
} from './../redux/slices/productSlice';
import LoadingPage from './LoadingPage';
import orderApi from '../API/orderApi';
import orderedItemApi from '../API/orderedItemApi';
import Swal from 'sweetalert2';
import { setTotalUnpaidItems } from '../redux/slices/orderedItemSlice';
import productApi from '../API/productApi';

function ProductPage() {
  const [product, setProduct] = useState();
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);

  const productList = useSelector(selectProductList);
  const loadingGetProducts = useSelector(selectProductLoading);

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(async () => {
    const { data } = await productApi.getById(id);

    setProduct(data.products[0]);

    dispatch(
      fetchProductList({
        _page: 1,
        _limit: 4,
        category: data.products[0].category,
        type: data.products[0].type,
        'productId[ne]': id,
      })
    );

    window.scrollTo(0, 0);
  }, [id]);

  useEffect(async () => {
    const { data: unpaidItems } = await orderedItemApi.getAllUnpaidItems();

    dispatch(setTotalUnpaidItems(unpaidItems.length));
  }, [id, loadingAddToCart]);

  const handleGetOrder = async (item) => {
    try {
      setLoadingAddToCart(true);
      const { data: orderedItems } = await orderedItemApi.getAllUnpaidItems();

      // ALL ORDERS ARE FINISHED
      if (orderedItems.length === 0) {
        const newOrder = {
          createdAt: new Date().toISOString(),
          total: item.subTotal,
        };

        const { data: orderResult } = await orderApi.createOne(newOrder);

        if (orderResult) {
          const newOrderedItem = {
            order: orderResult._id,
            product: item.id,
            amount: item.amount,
            size: item.size,
            subTotal: item.subTotal,
          };

          await orderedItemApi.createOne(newOrderedItem);
        }
      } else {
        const orderedItem = orderedItems.find(
          ({ size, product }) => size === item.size && product._id === item.id
        );

        const currentTotal = orderedItems[0].order.total;

        // UNFINISHED ORDER CONTAINS THIS CURRENT PRODUCT
        if (orderedItem) {
          const newAmount = orderedItem.amount + item.amount;

          const newSubTotal = orderedItem.subTotal + item.subTotal;

          const updatedOrderedItem = {
            _id: orderedItem._id,
            amount: newAmount,
            subTotal: newSubTotal,
          };

          const updatedOrder = {
            id: orderedItem.order._id,
            total: currentTotal + item.subTotal,
          };

          await orderedItemApi.updateOne(updatedOrderedItem);

          await orderApi.update(updatedOrder);
        }
        // UNFINISHED ORDER DOESN'T CONTAIN THIS CURRENT PRODUCT
        else {
          const newOrderedItem = {
            order: orderedItems[0].order._id,
            product: item.id,
            amount: item.amount,
            size: item.size,
            subTotal: item.subTotal,
          };
          const { data: createNewOrderedItemResult } =
            await orderedItemApi.createOne(newOrderedItem);

          if (createNewOrderedItemResult) {
            const updatedOrder = {
              id: orderedItems[0].order._id,
              total: item.subTotal + currentTotal,
            };

            await orderApi.update(updatedOrder);
          }
        }
      }

      setLoadingAddToCart(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: error.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <Wrapper>
      <Header />
      {!product || loadingGetProducts ? (
        <LoadingPage />
      ) : (
        <>
          <ProductDetail
            product={product}
            onGetOrder={handleGetOrder}
            loadingAddToCart={loadingAddToCart}
          />
          <RelatedProduct list={productList} item={product} />
        </>
      )}
      <Footer />
    </Wrapper>
  );
}

export default ProductPage;
