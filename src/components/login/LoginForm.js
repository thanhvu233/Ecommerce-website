import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from 'antd';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import styles from './LoginForm.module.scss';
import './LoginForm.scss';

const schema = yup
  .object({
    username: yup.string().required('Please enter username'),
    password: yup.string().required('Please enter password'),
  })
  .required();

export function LoginForm({ initialValues, onSubmit }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues) => {
    try {
      await onSubmit?.(formValues);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={styles.username}>
        <label className={styles.label}>Username</label>
        <Controller
          name='username'
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type='text'
              className='inputField'
              placeholder='Username...'
            />
          )}
        />
        <div className={styles.errorMsg}>{errors.username?.message}</div>
      </div>

      <div className={styles.password}>
        <label className={styles.label}>Password</label>
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type='password'
              className='inputField'
              placeholder='Password...'
            />
          )}
        />
        <div className={styles.errorMsg}>{errors.password?.message}</div>
      </div>

      <div className={`${styles.submitBtn} submitBtn`}>
        <Button htmlType='submit' size='large' loading={isSubmitting}>
          Enter
        </Button>
      </div>
    </form>
  );
}
