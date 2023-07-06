import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import orderApi from '../API/orderApi';
import { CartTable, PaymentMethod, PurchaseButton } from '../components/cart';
import { Footer, Header, Wrapper } from '../components/common';
import LoadingPage from './LoadingPage';
import {
  selectUnpaidItemList,
  setTotalUnpaidItems,
  setUnpaidItems,
} from '../redux/slices/orderedItemSlice';
import orderedItemApi from '../API/orderedItemApi';
import { LoadingOverlay } from '../components/common/LoadingOverlay';
import checkoutApi from '../API/checkoutApi';

function CartPage() {
  const [orderId, setOrderId] = useState();
  const [loadingAmountChange, setLoadingAmountChange] = useState(false);
  const [loadingRemoveItem, setLoadingRemoveItem] = useState(false);
  const [loadingHandlePurchase, setLoadingHandlePurchase] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const dispatch = useDispatch();
  const orderedItems = useSelector(selectUnpaidItemList);

  const history = useHistory();

  useEffect(async () => {
    const { data: unpaidItems } = await orderedItemApi.getAllUnpaidItems();

    dispatch(setTotalUnpaidItems(unpaidItems.length));
    dispatch(setUnpaidItems(unpaidItems));

    setOrderId(unpaidItems[0].order._id);

    // Scroll to top when navigate from other page
    window.scrollTo(0, 0);
  }, [dispatch]);

  const removeItem = async (item) => {
    try {
      setLoadingRemoveItem(true);

      const deleteOrderdItemResult = await orderedItemApi.deleteOne(item._id);

      console.log('deleteOrderdItemResult', deleteOrderdItemResult);

      if (deleteOrderdItemResult.data === undefined) {
        const { data: unpaidItems } = await orderedItemApi.getAllUnpaidItems();

        if (unpaidItems.length === 0) {
          await orderApi.delete(item.order._id);
          history.push('/');
        }

        dispatch(setTotalUnpaidItems(unpaidItems.length));
        dispatch(setUnpaidItems(unpaidItems));

        setLoadingRemoveItem(false);
      }
    } catch (error) {
      console.log('Cant remove item from cart', error);
      Swal.fire({
        icon: 'error',
        title: error.message,
        showConfirmButton: false,
        timer: 5000,
      });
    }
  };

  const handleRemove = (item) => {
    Swal.fire({
      icon: 'question',
      title: 'Do you really want to remove this item?',
      confirmButtonText: 'Yes',
      showDenyButton: true,
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        removeItem(item);
      }
    });
  };

  const handleAmountChange = async (product, value) => {
    try {
      setLoadingAmountChange(true);
      const selectedItem = orderedItems.find((item) => {
        return (
          item.product._id === product._id && item.product.size === product.size
        );
      });

      const newOrderedItem = {
        _id: selectedItem._id,
        order: selectedItem.order._id,
        product: product._id,
        amount: value,
        subTotal: (selectedItem.subTotal / selectedItem.amount) * value,
        size: selectedItem.size,
        paid: selectedItem.paid,
      };

      const updateOrderedItemResult = await orderedItemApi.updateOne(
        newOrderedItem
      );

      if (updateOrderedItemResult) {
        const { data: unpaidItems } = await orderedItemApi.getAllUnpaidItems();

        dispatch(setTotalUnpaidItems(unpaidItems.length));
        dispatch(setUnpaidItems(unpaidItems));

        setLoadingAmountChange(false);
      }
    } catch (error) {
      console.log('Can@apos;t update quantity for item', error);
      Swal.fire({
        icon: 'error',
        title: error.message,
        showConfirmButton: false,
        timer: 5000,
      });
    }
  };

  const handlePurchase = async () => {
    setLoadingHandlePurchase(true);

    if (paymentMethod !== 'cod') {
      const { data: session } = await checkoutApi.getCheckoutSession(orderId);

      setLoadingHandlePurchase(false);

      if (session) {
        window.location.replace(session.url);
      }
    } else {
      const { data: updateOrderedItemResult } = await orderedItemApi.update({
        id: orderId,
        status: 'checkout',
      });

      const { data: updateOrderResult } = await orderApi.update({
        id: orderId,
        paymentMethod: 'cod',
        status: 'checkout',
      });

      if (updateOrderedItemResult && updateOrderResult) {
        setLoadingHandlePurchase(false);

        Swal.fire({
          icon: 'success',
          title: 'Checkout Successfully',
          showConfirmButton: false,
          timer: 2000,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

        setTimeout(() => {
          history.push('/');
        }, 2000);
      }
    }
  };

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  return (
    <>
      <Wrapper>
        <Header />
        {!orderId || (orderedItems.length === 0 && !loadingRemoveItem) ? (
          <LoadingPage />
        ) : (
          <>
            <CartTable
              onRemove={handleRemove}
              onAmountChange={handleAmountChange}
            />
            <PaymentMethod
              paymentMethod={paymentMethod}
              onPaymentMethodChange={handlePaymentMethodChange}
            />
            <PurchaseButton
              onPurchase={handlePurchase}
              loadingHandlePurchase={loadingHandlePurchase}
            />
          </>
        )}

        <Footer />
      </Wrapper>
      {(loadingAmountChange || loadingRemoveItem) && <LoadingOverlay />}
    </>
  );
}

export default CartPage;
