import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Footer, Header } from '../components/common';
import styles from '../components/common/_global.module.scss';
import productApi from './../API/productApi';
import { ProductDetail, RelatedProduct } from './../components/product/';

function ProductPage() {
    const [product, setProduct] = useState({});
    const { id } = useParams();

    const fetchProductById = async (productId) => {
        try {
            const data = await productApi.getById(productId);

            setProduct(data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProductById(id);
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
            <ProductDetail product={initialValues} />
            <RelatedProduct />
            <Footer />
        </div>
    );
}

export default ProductPage;
