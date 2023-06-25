import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Container } from './../common';
import styles from './ChangePasswordForm.module.scss';
import userApi from '../../API/userApi';
import Swal from 'sweetalert2';
import { useMemo } from 'react';

const schema = yup
    .object({
        currentPassword: yup.string().required('Please enter current password'),
        newPassword: yup.string().required('Please enter new password').min(8, 'New password must have at least 8 characters'),
        newPasswordConfirm: yup
            .string()
            .required('Please enter new password confirmation')
            .test(
                'password-confirmation',
                'Password confirmation must match password',
                (value, context) => value && context.parent.newPassword && value === context.parent.newPassword,
            )
    });

export const ChangePasswordForm = () => {
    const initialValues = useMemo(() => ({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
    }), [])

    const {
        control,
        handleSubmit,
        formState: { isSubmitting, errors, isDirty },
        reset
    } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (formValues) => {
        try {
            const { data } = await userApi.updateUserPassword(formValues);

            if (data.token) {
                localStorage.setItem("access_token", data.token);

                Swal.fire({
                    icon: 'success',
                    title: "Update password successfully",
                    showConfirmButton: false,
                    timer: 2000,
                });

                reset();
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: error.message,
                showConfirmButton: false,
                timer: 5000,
            });
        }
    };

    return (
        <Container>
            <div className={styles.changePasswordForm}>
                {/* Header */}
                <div className={styles.header}>
                    Change Password
                </div>

                {/* Form */}
                <div className={styles.mainForm}>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div className={styles.field}>
                            <label className={styles.label}>Current Password</label>
                            <Controller
                                name='currentPassword'
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type='password'
                                        className='inputField'
                                        placeholder='Current password...'
                                    />
                                )}
                            />
                            <p className={styles.errorMsg}>{errors.currentPassword?.message}</p>
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>New Password</label>
                            <Controller
                                name='newPassword'
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type='password'
                                        className='inputField'
                                        placeholder='New Password...'
                                    />
                                )}
                            />
                            <p className={styles.errorMsg}>{errors.newPassword?.message}</p>
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>New Password Confirmation</label>
                            <Controller
                                name='newPasswordConfirm'
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type='password'
                                        className='inputField'
                                        placeholder='New Password Confirmation...'
                                    />
                                )}
                            />
                            <p className={styles.errorMsg}>{errors.newPasswordConfirm?.message}</p>
                        </div>


                        {/* Submit Button */}
                        <div className={`${styles.submitBtn} submitBtn`}>
                            <Button htmlType='submit' size='large' loading={isSubmitting} disabled={!isDirty}>
                                Enter
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    )
}
