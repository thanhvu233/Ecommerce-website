import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Footer, Header, Wrapper } from '../components/common';
import { addOrder } from '../helpers/addOrder';
import { updateOrder } from '../helpers/updateOrder';
import { fetchOrderList, selectOrderFilter } from '../redux/slices/orderSlice';
import { ProductDetail, RelatedProduct } from './../components/product/';
import { fetchProductById } from './../helpers/fetchProductById';
import {
    fetchProductList,
    selectProductList
} from './../redux/slices/productSlice';
import LoadingPage from './LoadingPage';

function ProductPage() {
    const [product, setProduct] = useState();
    const [orderQuantity, setOrderQuantity] = useState(0);
    const productList = useSelector(selectProductList);
    const orderFilter = useSelector(selectOrderFilter);

    const dispatch = useDispatch();

    const { id } = useParams();

    window.scrollTo(0, 0);

    const handleGetOrder = async (item) => {
        const actionResult = await dispatch(
            fetchOrderList({
                ...orderFilter,
                isCheckout: false,
                userId: localStorage.getItem('access_token'),
            })
        );

        let { data: result } = unwrapResult(actionResult);

        // ALL ORDERS ARE FINISHED
        if (result.length == 0) {
            const newOrder = {
                id: uuidv4(),
                userId: localStorage.getItem('access_token'),
                isCheckout: false,
                products: [
                    {
                        productId: `${item.productId}`,
                        name: `${item.name}`,
                        amount: item.amount,
                        size: `${item.size}`,
                        subTotal: item.subTotal,
                        image: item.image,
                    },
                ],
            };

            console.log('newOrder', newOrder);

            await addOrder(newOrder);

            // Update số lượng product trong cart lên localStorage
            localStorage.setItem('quantity', 1);

            // Set lại state orderQuantity để re-render Header
            setOrderQuantity(1);
        } else {
            // Tách object chứa product đã mua trước đó, ra khỏi mảng result
            const productArr = result[0].products;

            const objWanted = productArr.find((obj) => {
                return obj.productId == item.productId && obj.size == item.size;
            });

            // Kiểm tra xem order có sản phẩm không
            const isContain = Boolean(objWanted);

            // UNFINISHED ORDER CONTAINS THIS CURRENT PRODUCT
            if (isContain) {
                // Tính amount mới
                const newAmount = objWanted.amount + item.amount;

                // Tính subtotal mới
                const newSubTotal = objWanted.subTotal + item.subTotal;

                // Tạo mảng products mới để update property products
                let newProductList = productArr.filter((obj) => {
                    return (
                        obj.productId != item.productId ||
                        (obj.productId == item.productId && obj.size != item.size)
                    );
                });

                // Thêm product mới vào mảng products
                newProductList.push({
                    productId: objWanted.productId,
                    name: objWanted.name,
                    amount: newAmount,
                    size: objWanted.size,
                    subTotal: newSubTotal,
                    image: objWanted.image,
                });

                updateOrder({
                    id: result[0].id,
                    products: newProductList,
                });

                // Update số lượng product trong cart lên localStorage
                localStorage.setItem('quantity', newProductList.length);

                // Set lại state orderQuantity để re-render Header
                setOrderQuantity(newProductList.length);
            }
            // UNFINISHED ORDER DOESN'T CONTAIN THIS CURRENT PRODUCT
            else if (!isContain) {
                // Add this currentProduct to that order
                let newProductList = [...productArr, item];

                updateOrder({
                    id: result[0].id,
                    products: newProductList,
                });

                // Update số lượng product trong cart lên localStorage
                localStorage.setItem('quantity', newProductList.length);

                // Set lại state orderQuantity để re-render Header
                setOrderQuantity(newProductList.length);
            }
        }
    };

    useEffect(async () => {
        const {products} = await fetchProductById(id);


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

        if (localStorage.getItem('quantity')) {
            setOrderQuantity(localStorage.getItem('quantity'));
        } else {
            setOrderQuantity(0);
        }
    }, [id, orderQuantity]);

    return (
        <Wrapper>
            <Header quantity={orderQuantity} />
            {
                (!product || !productList) ? 
                (
                    <LoadingPage />
                ) : 
                (
                    <>
                        <ProductDetail product={product} onGetOrder={handleGetOrder} />
                        <RelatedProduct list={productList} item={product} />
                    </>
                )
            }
            <Footer />
        </Wrapper>
    );
}

export default ProductPage;
