import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Footer, Header, Wrapper } from '../components/common';
import { ProductDetail, RelatedProduct } from './../components/product/';
import { fetchProductById } from './../helpers/fetchProductById';
import {
    fetchProductList,
    selectProductList,
    selectProductLoading
} from './../redux/slices/productSlice';
import LoadingPage from './LoadingPage';
import orderApi from '../API/orderApi';
import orderedItemApi from '../API/orderedItemApi';
import Swal from 'sweetalert2';

function ProductPage() {
    const [product, setProduct] = useState();
    const [orderQuantity, setOrderQuantity] = useState(0);
    const [loadingAddToCart, setLoadingAddToCart] = useState(false);

    const productList = useSelector(selectProductList);
    const loadingGetProducts = useSelector(selectProductLoading);

    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(async () => {
        const { products } = await fetchProductById(id);

        window.scrollTo(0, 0);

        setProduct(products[0]);

        dispatch(
            fetchProductList({
                _page: 1,
                _limit: 4,
                category: products[0].category,
                type: products[0].type,
                "productId[ne]": id,
            })
        );
    }, [id]);

    const handleGetOrder = async (item) => {
        try {
            setLoadingAddToCart(true);
            const { data: orderedItems } = await orderedItemApi.getAllUnpaidItems();

            // ALL ORDERS ARE FINISHED
            if (orderedItems.length === 0) {
                const newOrder = {
                    createdAt: new Date().toISOString(),
                    total: item.subTotal
                };

                const { data: orderResult } = await orderApi.createOne(newOrder);

                if (orderResult) {
                    const newOrderedItem = {
                        order: orderResult._id,
                        product: item.id,
                        amount: item.amount,
                        size: item.size,
                        subTotal: item.subTotal
                    }
                    const { data: orderedItem } = await orderedItemApi.createOne(newOrderedItem);

                    if (orderedItem) {
                        localStorage.setItem('quantity', 1);
                        setOrderQuantity(1);
                    }
                }
            }
            else {
                const orderedItem = orderedItems.find(({ size, product }) => size === item.size && product === item.id);
                const currentTotal = orderedItems[0].order.total;

                // UNFINISHED ORDER CONTAINS THIS CURRENT PRODUCT
                if (orderedItem) {
                    const newAmount = orderedItem.amount + item.amount;

                    const newSubTotal = orderedItem.subTotal + item.subTotal;

                    const updatedOrderedItem = {
                        _id: orderedItem._id,
                        amount: newAmount,
                        subTotal: newSubTotal
                    }

                    const updatedOrder = {
                        id: orderedItem.order._id,
                        total: currentTotal + item.subTotal,
                    }

                    const updateOrderItemResult = await orderedItemApi.updateOne(updatedOrderedItem);

                    const updateOrderResult = await orderApi.update(updatedOrder);

                    if (updateOrderItemResult.data && updateOrderResult.data) {
                        localStorage.setItem('quantity', 1);
                        setOrderQuantity(1);
                    }
                }
                // UNFINISHED ORDER DOESN'T CONTAIN THIS CURRENT PRODUCT
                else {
                    const newOrderedItem = {
                        order: orderedItems[0].order._id,
                        product: item.id,
                        amount: item.amount,
                        size: item.size,
                        subTotal: item.subTotal
                    }
                    const { data: createNewOrderedItemResult } = await orderedItemApi.createOne(newOrderedItem);

                    if (createNewOrderedItemResult) {
                        const updatedOrder = {
                            id: orderedItems[0].order._id,
                            total: item.subTotal + currentTotal
                        }

                        const updateOrderResult = await orderApi.update(updatedOrder);

                        if (updateOrderResult) {
                            const quantity = localStorage.getItem('quantity');
                            localStorage.setItem('quantity', quantity + 1);
                            setOrderQuantity((prevState) => prevState + 1);
                        }
                    }
                }
            }

            setLoadingAddToCart(false);
        } catch (error) {
            console.log(error)
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
            <Header quantity={orderQuantity} />
            {
                (!product || loadingGetProducts) ?
                    (
                        <LoadingPage />
                    ) :
                    (
                        <>
                            <ProductDetail
                                product={product}
                                onGetOrder={handleGetOrder}
                                loadingAddToCart={loadingAddToCart}
                            />
                            <RelatedProduct list={productList} item={product} />
                        </>
                    )
            }
            <Footer />
        </Wrapper>
    );
}

export default ProductPage;
