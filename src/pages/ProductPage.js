import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import orderApi from '../API/orderApi';
import { Footer, Header } from '../components/common';
import styles from '../components/common/_global.module.scss';
import { fetchOrderList, selectOrderFilter } from '../redux/slices/orderSlice';
import productApi from './../API/productApi';
import { ProductDetail, RelatedProduct } from './../components/product/';
import { fetchProductList, selectProductList } from './../redux/slices/productSlice';
import { v4 as uuidv4 } from 'uuid';
const MySwal = withReactContent(Swal);

function ProductPage() {
    const [product, setProduct] = useState({});
    const [orderQuantity, setOrderQuantity] = useState(0);
    const productList = useSelector(selectProductList);
    const orderFilter = useSelector(selectOrderFilter);

    const dispatch = useDispatch();

    const { id } = useParams();

    const fetchProductById = async (productId) => {
        try {
            const { data } = await productApi.getById(productId);

            setProduct(data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const updateOrder = async (data) => {
        try {
            await orderApi.update(data);

            // Hiện thông báo update thành công
            Swal.fire({
                icon: 'success',
                title: 'Item has been added to cart',
                showConfirmButton: false,
                timer: 2000,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const addOrder = async (data) => {
        try {
            await orderApi.add(data);

            // Hiện thông báo update thành công
            Swal.fire({
                icon: 'success',
                title: 'Item has been added to cart',
                showConfirmButton: false,
                timer: 2000,
            });
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
                        amount: item.amount,
                        size: `${item.size}`,
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

        if (localStorage.getItem('quantity')) {
            setOrderQuantity(localStorage.getItem('quantity'));
        } else {
            setOrderQuantity(0);
        }

        window.scrollTo(0, 0);
    }, [id, orderQuantity]);

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
            <Header quantity={orderQuantity} />
            <ProductDetail product={initialValues} onGetOrder={handleGetOrder} />
            <RelatedProduct list={productList} item={initialValues} />
            <Footer />
        </div>
    );
}

export default ProductPage;
