import React, { ReactElement } from 'react';
import './App.scss';
import { Link, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../features/login-page/login-page';
import { Layout } from '../features/layout/layout';
import { OrderScreen } from '../features/order-screen/order-screen';

export const App = (): ReactElement => {
    return (
        <div className="App">
            <div>Dans Pizza Orders</div>
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/orders">Order Form</Link>
            </nav>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/layout" element={<Layout />} />
                <Route path="orders" element={<OrderScreen />} />
            </Routes>
        </div>
    );
};

export default App;
