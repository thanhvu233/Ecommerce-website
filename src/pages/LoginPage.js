import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Main } from '../components/login';
import { Wrapper } from './../components/common';
import { Header } from './../components/common/Header';
import userApi from '../API/userApi';

function LoginPage() {
  const history = useHistory();

  const initialValues = {
    username: '',
    password: '',
  };

  const path = localStorage.getItem('path');

  const handleFormSubmit = async (formValues) => {
    try {
      // Gọi API để kiểm tra account
      const { data } = await userApi.login(formValues);

      localStorage.setItem('access_token', data.token);

      Swal.fire({
        icon: 'success',
        title: 'Login Successfully',
        showConfirmButton: false,
        timer: 2000,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });

      setTimeout(() => {
        if (path == '/register') {
          history.push('/');
        } else {
          history.push(`${path}`);
        }
      }, 2000);
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
