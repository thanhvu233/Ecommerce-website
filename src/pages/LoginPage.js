import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Main } from '../components/login';
import { Wrapper } from './../components/common';
import { Header } from './../components/common/Header';
import { login } from '../redux/slices/authSlice';

function LoginPage() {
  const history = useHistory();

  const dispatch = useDispatch();

  const initialValues = {
    username: '',
    password: '',
  };

  const path = localStorage.getItem('path');

  const handleFormSubmit = async (formValues) => {
    try {
      // Gọi API để kiểm tra account
      const userResult = await dispatch(login(formValues));

      const { data } = unwrapResult(userResult);

      localStorage.setItem('access_token', data.token);

      if (path == '/register') {
        history.push('/');
      } else {
        history.push(`${path}`);
      }
    } catch (error) {
      console.log('error', error);
      Swal.fire({
        icon: 'error',
        title: error.message,
        showConfirmButton: false,
        timer: 5000,
      });
    }
  };

  return (
    <Wrapper>
      <Header />
      <Main initialValues={initialValues} onSubmit={handleFormSubmit} />
    </Wrapper>
  );
}

export default LoginPage;
