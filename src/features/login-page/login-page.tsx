import { Button, TextField } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './login-page.scss';
import { Login } from '../../models';
import { useAppDispatch } from '../../hooks/hooks';
import { LoginAsync } from '../../slices/auth.slice';

export const LoginPage = (): ReactElement => {
    const dispatch = useAppDispatch();

    const loginSchema = yup.object({
        username: yup.string(),
        password: yup.string(),
    });

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onLogin = (e: any) => {
        console.log('username', e.username);
        console.log('password', e.password);
        const request: Login = {
            username: 'test',
            password: 'test',
        };
        dispatch(LoginAsync(request));
    };

    return (
        <div>
            <div>Login Page</div>
            <div className="login">
                <TextField
                    className="textField"
                    {...register('username')}
                    label="Username"
                    variant="standard"
                />
                <TextField
                    className="textField"
                    {...register('password')}
                    label="Password"
                    variant="standard"
                />
                <Button
                    variant="contained"
                    size="medium"
                    onClick={handleSubmit(onLogin)}
                >
                    Login
                </Button>
            </div>
        </div>
    );
};
