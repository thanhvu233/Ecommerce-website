import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Input } from 'antd';
import React, { useState } from 'react';
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
        formState: { isSubmitting, errors },
    } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    });

    const [error, setError] = useState('');

    const handleFormSubmit = async (formValues) => {
        try {
            // Clear previous submission error
            setError('');
            await onSubmit?.(formValues);
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={styles.username}>
                <label className={styles.label}>Username</label>
                <Controller
                    name='username'
                    control={control}
                    render={({ field }) => <Input {...field} type='text' className='inputField' placeholder='Username...' />}
                />
                <div className={styles.errorMsg}>{errors.username?.message}</div>
            </div>

            <div className={styles.password}>
                <label className={styles.label}>Password</label>
                <Controller
                    name='password'
                    control={control}
                    render={({ field }) => (
                        <Input {...field} type='password' className='inputField' placeholder='Password...' />
                    )}
                />
                <div className={styles.errorMsg}>{errors.password?.message}</div>
            </div>

            <div className={`${styles.submitBtn} submitBtn`}>
                <Button htmlType='submit' size='large'>
                    Enter
                </Button>
            </div>
        </form>
    );
}
