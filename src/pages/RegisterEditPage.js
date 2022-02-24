import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { v4 as uuid } from 'uuid';
import userApi from '../API/userApi';
import { Footer, Header } from '../components/common';
import styles from '../components/common/_global.module.scss';
import { UserForm } from '../components/registerEdit';

function RegisterEditPage() {
    const [orderQuantity, setOrderQuantity] = useState(0);
    // Phải set initial value cho currentUser
    // là null, nếu không sẽ không đổ được data lên form
    const [currentUser, setCurrentUser] = useState();

    const { userId } = useParams();
    const history = useHistory();

    const isEdit = Boolean(userId);

    const fetchUserById = async (id) => {
        try {
            const { data } = await userApi.getById(id);

            setCurrentUser(data[0]);
        } catch (error) {
            console.log('Can&apos;t fetch user by id', error);
        }
    };

    const handleFormSubmit = async (formValues) => {
        if (isEdit) {
            try {
                const newInfo = {
                    id: userId,
                    ...formValues,
                };

                await userApi.update(newInfo);

                Swal.fire({
                    icon: 'success',
                    title: 'Update info successfully',
                    showConfirmButton: false,
                    timer: 2000,
                });
            } catch (error) {
                console.log('Can&apos;t update info by id', error);
            }
        } else {
            try {
                const newUser = {
                    id: uuid(),
                    ...formValues,
                };

                await userApi.add(newUser);

                Swal.fire({
                    icon: 'success',
                    title: 'Create account successfully',
                    showConfirmButton: false,
                    timer: 2000,
                });

                setTimeout(() => {
                    history.push('/login');
                }, 2000);
            } catch (error) {
                console.log('Can&apos;t create account', error);
            }
        }
    };

    useEffect(async () => {
        if (userId) {
            // Gọi API lấy data của user đổ lên form
            await fetchUserById(userId);
        }
        if (localStorage.getItem('quantity')) {
            setOrderQuantity(localStorage.getItem('quantity'));
        } else {
            setOrderQuantity(0);
        }

        // Scroll to top when navigate from other page
        window.scrollTo(0, 0);
    }, [userId]);

    const initialValues = {
        name: '',
        address: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        ...currentUser,
    };

    return (
        <div className={styles.wrapper}>
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
        </div>
    );
}

export default RegisterEditPage;
