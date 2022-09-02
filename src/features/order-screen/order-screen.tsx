import { Button, TextField } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Orders } from '../../models';
import './order-screen.scss';

export const OrderScreen = (): ReactElement => {
    const testOrders = [
        {
            Crust: 'NORMAL',
            Flavor: 'BEEF-NORMAL',
            Order_ID: 1,
            Size: 'M',
            Table_No: 1,
            Timestamp: '2019-12-03T18:21:08.669365',
        },
        {
            Crust: 'NORMAL',
            Flavor: 'CHICKEN-FAJITA',
            Order_ID: 3,
            Size: 'L',
            Table_No: 3,
            Timestamp: '2019-12-03T18:21:08.710006',
        },
        {
            Crust: 'Thin',
            Flavor: 'Beef',
            Order_ID: 4,
            Size: 'M',
            Table_No: 9,
            Timestamp: '2022-09-01T22:02:41.548984',
        },
    ];

    const OrderSchema = yup.object({
        Crust: yup.string(),
        Flavor: yup.string(),
        Size: yup.string(),
        Table_No: yup.string(),
    });

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(OrderSchema),
    });

    const [orders, setOrders] = useState(testOrders);
    const [searchValue, setSearchValue] = useState();

    const onOrderSubmit = (e: any) => {
        console.log('onOrderSubmit', e);
    };

    const onOrderDelete = (e: any) => {
        console.log('onOrderDelete', e);
    };

    const handleSearch = (e: any) => {
        console.log('handleSearch', e.target.value);
        setSearchValue(e.target.value);

        const newList = orders.filter((order, i) => order === searchValue);

        setOrders(newList);
    };

    return (
        <div className="order-page">
            <div>Order Form</div>
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
                {orders?.map((order: Orders) => (
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
                            size="small"
                            onClick={(e): void => onOrderDelete(e)}
                        >
                            X
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};
