import { Button, TextField } from '@mui/material';
import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './login-page.scss';
import { Login } from '../../models';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { AuthSelector, LoginAsync } from '../../slices/auth.slice';
import { Navigate } from 'react-router-dom';
import { FeatureHeader } from '../shared/feature-header/feature-header';

export const LoginPage = (): ReactElement => {
    const dispatch = useAppDispatch();
    const { isLoginSuccessful } = useAppSelector(AuthSelector);

    const loginSchema = yup.object({
        username: yup.string(),
        password: yup.string(),
    });

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onLogin = (e: any) => {
        const request: Login = {
            username: e.username,
            password: e.password,
        };
        dispatch(LoginAsync(request));
    };

    if (isLoginSuccessful) {
        return <Navigate to="/layout/orders" />;
    }

    return (
        <div className="login-page">
            <FeatureHeader headerText="Login Page" />
            <div className="login-page__form">
                <TextField
                    {...register('username')}
                    label="Username"
                    variant="standard"
                />
                <TextField
                    {...register('password')}
                    label="Password"
                    variant="standard"
                />
                <div className="login-page__button">
                    <Button
                        variant="contained"
                        size="medium"
                        onClick={handleSubmit(onLogin)}
                    >
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
};
