import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import orderApi from '../API/orderApi';
import { Footer, Header } from '../components/common';
import styles from '../components/common/_global.module.scss';
import { fetchOrderList, selectOrderFilter, setQuantity } from '../redux/slices/orderSlice';
import productApi from './../API/productApi';
import { ProductDetail, RelatedProduct } from './../components/product/';
import { fetchProductList, selectProductList } from './../redux/slices/productSlice';

function ProductPage() {
    const [product, setProduct] = useState({});
    const productList = useSelector(selectProductList);
    const orderFilter = useSelector(selectOrderFilter);

    const dispatch = useDispatch();

    const { id } = useParams();

    const fetchProductById = async (productId) => {
        try {
            const data = await productApi.getById(productId);

            setProduct(data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const updateOrder = async (data) => {
        try {
            await orderApi.update(data);

            console.log('Update thanh cong');
        } catch (error) {
            console.log(error);
        }
    };

    const handleGetOrder = async (item) => {
        const actionResult = await dispatch(
            fetchOrderList({
                ...orderFilter,
                isCheckout: false,
                userId: localStorage.getItem('access_token'),
            })
        );

        let result = unwrapResult(actionResult);

        // Tách mảng productId ra khỏi mảng result
        const productArr = result[0].products;

        const objWanted = productArr.find((obj) => {
            return obj.productId == item.productId && obj.size == item.size;
        });

        // Kiểm tra xem order có sản phẩm không
        const isContain = Boolean(objWanted);

        if (isContain) {
            // Tính amount mới
            const newAmount = objWanted.amount + item.amount;

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
                amount: newAmount,
                size: objWanted.size,
            });

            updateOrder({
                id: result[0].id,
                products: newProductList,
            });

            // Update số lượng product trong cart lên localStorage
            localStorage.setItem('quantity', newProductList.length);
        }
    };

    useEffect(() => {
        fetchProductById(id);

        dispatch(
            fetchProductList({
                _page: 1,
                _limit: 4,
                category: product.category,
                type: product.type,
                productId_ne: id,
            })
        );

        window.scrollTo(0, 0);
    }, [id]);

    // Tạo 1 object ban đầu và ném xuống component để nó render nháp
    // Nếu không làm như thế thì component sẽ render trước cả khi có data
    const initialValues = {
        productId: '',
        productName: '',
        price: 0,
        description: '',
        images: [],
        sizes: '',
        rating: 0,
        category: '',
        type: '',
        ...product,
    };

    return (
        <div className={styles.wrapper}>
            <Header />
            <ProductDetail product={initialValues} onGetOrder={handleGetOrder} />
            <RelatedProduct list={productList} item={initialValues} />
            <Footer />
        </div>
    );
}

export default ProductPage;
