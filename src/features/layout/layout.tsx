import React, { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { AuthSelector } from '../../slices/auth.slice';

export const Layout = (): ReactElement => {
    const { isLoginSuccessful } = useAppSelector(AuthSelector);
    if (!isLoginSuccessful) {
        return <Navigate to="/" />;
    }

    return (
        <div className="layout">
            <Outlet />
        </div>
    );
};
