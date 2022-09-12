import { Button, TextField } from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Order } from '../../models';
import './order-screen.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { GetOrdersAsync, OrderSelector } from '../../slices/orders.slice';
import { AuthSelector } from '../../slices/auth.slice';
import { FeatureHeader } from '../shared/feature-header/feature-header';

export const OrderScreen = (): ReactElement => {
    const dispatch = useAppDispatch();
    const { orders } = useAppSelector(OrderSelector);
    const { isLoginSuccessful } = useAppSelector(AuthSelector);

    const OrderSchema = yup.object({
        Crust: yup.string(),
        Flavor: yup.string(),
        Size: yup.string(),
        Table_No: yup.string(),
    });

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(OrderSchema),
    });

    const [ordersTest, setOrders] = useState(orders);
    const [searchValue, setSearchValue] = useState();

    const onOrderSubmit = (e: any): void => {
        console.log('onOrderSubmit', e);
    };

    const onOrderDelete = (e: any): void => {
        console.log('onOrderDelete', e);
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
        console.log('order page');
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
                />
                <Button
                    variant="contained"
                    size="medium"
                    onClick={handleSubmit(onOrderSubmit)}
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
                    <div key={order.Order_ID} className="order">
                        <div className="order__item">
                            <div className="order__name">Crust</div>
                            {order.Crust}
                        </div>
                        <div className="order__item">
                            <div className="order__name">Flavor</div>
                            {order.Flavor}
                        </div>
                        <div className="order__item">
                            <div className="order__name">Order Number</div>
                            {order.Order_ID}
                        </div>
                        <div className="order__item">
                            <div className="order__name">Size</div> {order.Size}
                        </div>
                        <div className="order__item">
                            <div className="order__name">Table</div>
                            {order.Table_No}
                        </div>
                        <div className="order__item">
                            <div className="order__name">Time</div>
                            {order.Timestamp}
                        </div>
                        <Button
                            variant="outlined"
                            size="medium"
                            onClick={(e): void => onOrderDelete(e)}
                        >
                            X
                        </Button>
                    </div>
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
