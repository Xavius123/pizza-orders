import React, { ReactElement } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../features/login-page/login-page';
import { Layout } from '../features/layout/layout';
import { OrderScreen } from '../features/order-screen/order-screen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = (): ReactElement => {
    return (
        <div className="App">
            <div className="App__title">Dan's Pizza Orders</div>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/layout" element={<Layout />}>
                    <Route path="orders" element={<OrderScreen />} />
                </Route>
            </Routes>
            <ToastContainer theme="light" />
        </div>
    );
};

export default App;
