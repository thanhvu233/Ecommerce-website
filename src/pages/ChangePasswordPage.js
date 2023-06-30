import React, { useEffect } from 'react';
import { Footer, Header, Wrapper } from '../components/common';
import { ChangePasswordForm } from '../components/changePassword';
import orderedItemApi from '../API/orderedItemApi';
import { setTotalUnpaidItems } from '../redux/slices/orderedItemSlice';
import { useDispatch } from 'react-redux';

export const ChangePasswordPage = () => {
    const dispatch = useDispatch();

    useEffect(async () => {
        const { data: unpaidItems } = await orderedItemApi.getAllUnpaidItems();

        dispatch(setTotalUnpaidItems(unpaidItems.length));

        // Scroll to top when navigate from other page
        window.scrollTo(0, 0);
    }, []);

    return (
        <Wrapper>
            <Header />
            <ChangePasswordForm />
            <Footer />
        </Wrapper>
    );
}
