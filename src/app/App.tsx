import React, { ReactElement } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../features/login-page/login-page';
import { Layout } from '../features/layout/layout';
import { OrderScreen } from '../features/order-screen/order-screen';

export const App = (): ReactElement => {
    return (
        <div className="App">
            <div>Dan AMAZING Pizza Orders</div>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/layout" element={<Layout />}>
                    <Route path="orders" element={<OrderScreen />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
