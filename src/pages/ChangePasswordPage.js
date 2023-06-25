import React, { useEffect, useState } from 'react';
import { Footer, Header, Wrapper } from '../components/common';
import { ChangePasswordForm } from '../components/changePassword';

export const ChangePasswordPage = () => {
    const [orderQuantity, setOrderQuantity] = useState(0);

    useEffect(async () => {
        if (localStorage.getItem('quantity')) {
            setOrderQuantity(localStorage.getItem('quantity'));
        } else {
            setOrderQuantity(0);
        }

        // Scroll to top when navigate from other page
        window.scrollTo(0, 0);
    }, []);

    return (
        <Wrapper>
            <Header quantity={orderQuantity} />
            <ChangePasswordForm />
            <Footer />
        </Wrapper>
    );
}
