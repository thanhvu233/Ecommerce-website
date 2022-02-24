import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Input } from 'antd';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import styles from './UserForm.module.scss';

const schema = yup
    .object({
        name: yup.string().required('Please enter a name'),
        address: yup.string().required('Please enter an address'),
        phone: yup
            .string()
            .required('Please enter a phone')
            .min(10, 'Phone must have at least 10 digits'),
        email: yup
            .string()
            .email('Please enter correct email format')
            .required('Please enter an email'),
        username: yup.string().required('Please enter an username'),
        password: yup
            .string()
            .required('Please enter a password')
            .min(8, 'Password must be at least 8 characters'),
    })
    .required();

export function UserForm({ isEdit, initialValues, onSubmit }) {
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
        <div className={styles.container}>
            <div className={styles.userForm}>
                {/* Header */}
                <div className={styles.header}>
                    {isEdit ? 'Edit Account' : 'Create New Account'}
                </div>

                {/* Form */}
                <div className={styles.mainForm}>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className={styles.name}>
                            <label className={styles.label}>Name</label>
                            <Controller
                                name='name'
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type='text'
                                        className='inputField'
                                        placeholder='Name...'
                                    />
                                )}
                            />
                            <p className={styles.errorMsg}>{errors.name?.message}</p>
                        </div>
                        <div className={styles.address}>
                            <label className={styles.label}>Address</label>
                            <Controller
                                name='address'
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type='text'
                                        className='inputField'
                                        placeholder='Address...'
                                    />
                                )}
                            />
                            <p className={styles.errorMsg}>{errors.address?.message}</p>
                        </div>
                        <div className={styles.phone}>
                            <label className={styles.label}>Phone</label>
                            <Controller
                                name='phone'
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type='text'
                                        className='inputField'
                                        placeholder='Phone...'
                                    />
                                )}
                            />
                            <p className={styles.errorMsg}>{errors.phone?.message}</p>
                        </div>
                        <div className={styles.email}>
                            <label className={styles.label}>Email</label>
                            <Controller
                                name='email'
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type='text'
                                        className='inputField'
                                        placeholder='Email...'
                                    />
                                )}
                            />
                            <p className={styles.errorMsg}>{errors.email?.message}</p>
                        </div>
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
                            <p className={styles.errorMsg}>{errors.username?.message}</p>
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
                            <p className={styles.errorMsg}>{errors.password?.message}</p>
                        </div>

                        {/* Submit Button */}
                        <div className={`${styles.submitBtn} submitBtn`}>
                            <Button htmlType='submit' size='large'>
                                Create
                            </Button>
                        </div>
                        {error && (
                            <Alert
                                message={error}
                                type='error'
                                showIcon
                                className={styles.formErr}
                            />
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
