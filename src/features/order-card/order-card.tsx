import { Button } from '@mui/material';
import React, { ReactElement } from 'react';
import './order-card.scss';
import { useAppDispatch } from '../../hooks/hooks';
import { DeleteOrderAsync } from '../../slices/orders.slice';
import { Order } from '../../models';
import { getDateTime } from '../../helper';

interface OrderCardProps {
    order: Order;
    index: number;
}

export const OrderCard = (props: OrderCardProps): ReactElement => {
    const { order, index } = props;
    const dispatch = useAppDispatch();
    const onDeleteOrder = (orderNumber: number): void => {
        dispatch(DeleteOrderAsync(orderNumber));
    };

    return (
        <div key={index} className="card">
            <div className="card__button">
                <div className="card__title">Order No. {order.Order_ID}</div>
                <Button
                    variant="contained"
                    size="medium"
                    color="error"
                    onClick={(): void => onDeleteOrder(order.Order_ID)}
                >
                    Remove
                </Button>
            </div>
            <div className="card__item">
                <div className="card__name">Crust:</div>
                <div className="card__text"> {order.Crust}</div>
            </div>
            <div className="card__item">
                <div className="card__name">Flavor:</div>
                <div className="card__text"> {order.Flavor}</div>
            </div>
            <div className="card__item">
                <div className="card__name">Size:</div>
                <div className="card__text"> {order.Size}</div>
            </div>
            <div className="card__item">
                <div className="card__name">Table:</div>
                <div className="card__text"> {order.Table_No}</div>
            </div>
            <div className="card__item">
                <div className="card__name">Time:</div>
                <div className="card__text">{getDateTime(order.Timestamp)}</div>
            </div>
        </div>
    );
};
