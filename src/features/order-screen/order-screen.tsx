import { Button, TextField } from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Order, OrderForm } from '../../models';
import './order-screen.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
    GetOrdersAsync,
    OrderSelector,
    AddOrderAsync,
    DeleteOrderAsync,
} from '../../slices/orders.slice';
import { AuthSelector } from '../../slices/auth.slice';
import { FeatureHeader } from '../shared/feature-header/feature-header';
import { OrderCard } from '../order-card/order-card';

export const OrderScreen = (): ReactElement => {
    const dispatch = useAppDispatch();
    const { orders } = useAppSelector(OrderSelector);
    const { isLoginSuccessful } = useAppSelector(AuthSelector);

    const OrderSchema = yup.object({
        Crust: yup.string(),
        Flavor: yup.string(),
        Size: yup.string(),
        Table_No: yup.number(),
    });

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(OrderSchema),
    });

    const [ordersTest, setOrders] = useState(orders);
    const [searchValue, setSearchValue] = useState();

    const onAddOrder = (e: any): void => {
        console.log('onOrderSubmit', e);
        const request: OrderForm = {
            Crust: e.Crust,
            Flavor: e.Flavor,
            Size: e.Size,
            Table_No: e.Table_No,
        };

        dispatch(AddOrderAsync(request));
    };

    const onDeleteOrder = (orderNumber: number): void => {
        console.log('onOrderDelete', orderNumber);
        dispatch(DeleteOrderAsync(orderNumber));
    };

    // const onlogOut = (): void => {
    //     console.log('onlogOut');
    //     sessionStorage.clear();
    // };

    const handleSearch = (e: any) => {
        console.log('handleSearch', e.target.value);
        setSearchValue(e.target.value);

        const newList = ordersTest.filter(
            (order: Order, i: any) => order === searchValue
        );

        setOrders(newList);
    };

    useEffect(() => {
        dispatch(GetOrdersAsync());
    }, []);

    useEffect(() => {
        setOrders(orders);
    }, [orders, isLoginSuccessful]);

    // if (isLoginSuccessful) {
    //     return <Navigate to="/" />;
    // }

    return (
        <div className="order-page">
            <FeatureHeader headerText="Order Form" />
            <div className="orderForm">
                <TextField
                    className="textField"
                    {...register('Crust')}
                    label="Crust"
                    variant="standard"
                />
                <TextField
                    className="textField"
                    {...register('Flavor')}
                    label="Flavor"
                    variant="standard"
                />
                <TextField
                    className="textField"
                    {...register('Size')}
                    label="Size"
                    variant="standard"
                />
                <TextField
                    {...register('Table_No')}
                    label="Table"
                    variant="standard"
                    type="number"
                />
                <Button
                    variant="contained"
                    size="medium"
                    onClick={handleSubmit(onAddOrder)}
                >
                    Submit
                </Button>
            </div>
            <div className="search">
                <TextField
                    className="textField"
                    value={searchValue}
                    onChange={(e: any): void => handleSearch(e)}
                    label="Size"
                    variant="standard"
                />
            </div>
            <div className="orders">
                {ordersTest?.map((order: Order) => (
                    <OrderCard order={order} />
                ))}
            </div>
            {/* <Button
                variant="contained"
                size="medium"
                onClick={(): void => onlogOut()}
            >
                LogOut
            </Button> */}
        </div>
    );
};
