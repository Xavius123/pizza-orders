import { Button, TextField } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './login-page.scss';

export const LoginPage = (): ReactElement => {
    const [placeholder, setPlaceholder] = useState('login page');
    const loginSchema = yup.object({
        username: yup.string(),
        password: yup.string(),
    });

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onLogin = (e: any) => {
        console.log(e);
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
