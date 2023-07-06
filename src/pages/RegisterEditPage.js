import React, { useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import userApi from '../API/userApi';
import { Footer, Header, Wrapper } from '../components/common';
import { UserForm } from '../components/registerEdit';
import LoadingPage from './LoadingPage';
import orderedItemApi from '../API/orderedItemApi';
import { setTotalUnpaidItems } from '../redux/slices/orderedItemSlice';
import { useDispatch } from 'react-redux';

function RegisterEditPage() {
  const [currentUser, setCurrentUser] = useState();

  const history = useHistory();

  const isEdit = useMemo(() => {
    const token = window.localStorage.getItem('access_token');

    return !!token;
  }, []);

  const dispatch = useDispatch();

  useEffect(async () => {
    if (isEdit) {
      const { data } = await userApi.getCurrentUser();

      setCurrentUser(data);
    }

    // Scroll to top when navigate from other page
    window.scrollTo(0, 0);
  }, [isEdit]);

  useEffect(async () => {
    const { data: unpaidItems } = await orderedItemApi.getAllUnpaidItems();

    dispatch(setTotalUnpaidItems(unpaidItems.length));
  });

  const handleFormSubmit = async (formValues) => {
    if (isEdit) {
      try {
        const newInfo = {
          ...formValues,
          password: undefined,
          passwordConfirm: undefined,
        };

        await userApi.updateUserProfile(newInfo);

        Swal.fire({
          icon: 'success',
          title: 'Edit profile successfully',
          showConfirmButton: false,
          timer: 2000,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: error.message,
          showConfirmButton: false,
          timer: 5000,
        });
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
        Swal.fire({
          icon: 'error',
          title: error.message,
          showConfirmButton: false,
          timer: 5000,
        });
      }
    }
  };

  const initialValues = useMemo(
    () => ({
      name: '',
      address: '',
      phone: '',
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
      ...currentUser,
    }),
    [currentUser]
  );

  return (
    <Wrapper>
      <Header />
      {!isEdit || currentUser ? (
        <UserForm
          isEdit={isEdit}
          initialValues={initialValues}
          onSubmit={handleFormSubmit}
        />
      ) : (
        <LoadingPage />
      )}
      <Footer />
    </Wrapper>
  );
}

export default RegisterEditPage;
