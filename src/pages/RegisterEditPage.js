import React, { useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import userApi from '../API/userApi';
import { Footer, Header, Wrapper } from '../components/common';
import { UserForm } from '../components/registerEdit';
import LoadingPage from './LoadingPage';

function RegisterEditPage() {
    const [orderQuantity, setOrderQuantity] = useState(0);
    // Phải set initial value cho currentUser
    // là null, nếu không sẽ không đổ được data lên form
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const isEdit = useMemo(() => {
        const token = window.localStorage.getItem("access_token");

        return !!token;
    }, [])

    const handleFormSubmit = async (formValues) => {
        if (isEdit) {
            try {
                const newInfo = {
                    ...formValues,
                };

                await userApi.update(newInfo);

                Swal.fire({
                    icon: 'success',
                    title: 'Update info successfully',
                    showConfirmButton: false,
                    timer: 2000,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                });
            } catch (error) {
                console.log('Can&apos;t update info by id', error);
            }
        } else {
            try {
                const newUser = {
                    ...formValues,
                };

                const data = await userApi.signUp(newUser);

                if (data.data.userId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Create account successfully',
                        showConfirmButton: false,
                        timer: 2000,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    });

                    setTimeout(() => {
                        localStorage.setItem('path', '/register');
                        history.push('/login');
                    }, 2000);
                }


            } catch (error) {
                console.log('Can&apos;t create account', error);
            }
        }
    };

    useEffect(async () => {
        if (isEdit) {
            // Gọi API lấy data của user đổ lên form
            const { data } = await userApi.getCurrentUser();
    
            setCurrentUser(data);
            setLoading(false);
    
            if (localStorage.getItem('quantity')) {
                setOrderQuantity(localStorage.getItem('quantity'));
            } else {
                setOrderQuantity(0);
            }
    
            // Scroll to top when navigate from other page
            window.scrollTo(0, 0);
        }
    }, [isEdit]);

    const initialValues = useMemo(() => ({
        name: '',
        address: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        passwordConfirm: '',
        ...currentUser,
    }), [currentUser]);

    if (loading && isEdit) {
        return <LoadingPage />;
    }

    return (
        <Wrapper>
            <Header quantity={orderQuantity} />
            {/* Là trang ADD hoặc phải có currentUser thì mới render form */}
            {(!isEdit || Boolean(currentUser)) && (
                <UserForm
                    isEdit={isEdit}
                    initialValues={initialValues}
                    onSubmit={handleFormSubmit}
                />
            )}
            <Footer />
        </Wrapper>
    );
}

export default RegisterEditPage;
