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
} from '../../slices/orders.slice';
import { AuthSelector } from '../../slices/auth.slice';
import { FeatureHeader } from '../shared/feature-header/feature-header';
import { OrderCard } from '../order-card/order-card';

export const OrderScreen = (): ReactElement => {
    const dispatch = useAppDispatch();
    const { orders } = useAppSelector(OrderSelector);
    const { isLoginSuccessful } = useAppSelector(AuthSelector);
    const [ordersList, setOrdersList] = useState(orders);
    const [searchText, setSearchText] = useState('');
    const excludeColumns = ['Size', 'Table', 'Time'];
    const OrderSchema = yup.object({
        Crust: yup.string(),
        Flavor: yup.string(),
        Size: yup.string(),
        Table_No: yup.number(),
    });

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(OrderSchema),
    });

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

    const handleSearch = (e: any) => {
        setSearchText(e.target.value);
        filterData(e.target.value);
    };

    const filterData = (value: any) => {
        console.log('v', value);
        const lowercasedValue = value.toLowerCase().trim();
        if (lowercasedValue === '') setOrdersList(orders);
        else {
            const filteredData = orders.filter((order: any) => {
                return Object.keys(order).some((key) =>
                    excludeColumns.includes(key)
                        ? false
                        : order[key]
                              .toString()
                              .toLowerCase()
                              .includes(lowercasedValue)
                );
            });
            setOrdersList(filteredData);
        }
    };

    useEffect(() => {
        dispatch(GetOrdersAsync());
    }, []);

    useEffect(() => {
        setOrdersList(orders);
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
                    value={searchText}
                    onChange={(e: any): void => handleSearch(e)}
                    label="Search"
                    variant="standard"
                />
            </div>
            <div className="orders">
                {ordersList?.map((order: Order) => (
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
