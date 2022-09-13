import { Button } from '@mui/material';
import React, { ReactElement } from 'react';
import './order-card.scss';
import { useAppDispatch } from '../../hooks/hooks';
import { DeleteOrderAsync } from '../../slices/orders.slice';
import { Order } from '../../models';

interface OrderCardProps {
    order: Order;
}

export const OrderCard = (props: OrderCardProps): ReactElement => {
    const { order } = props;
    const dispatch = useAppDispatch();
    const onDeleteOrder = (orderNumber: number): void => {
        dispatch(DeleteOrderAsync(orderNumber));
    };

    return (
        <div key={order.Order_ID} className="card">
            <div className="card__button">
                <div className="card__title">Order Number {order.Order_ID}</div>
                <Button
                    variant="contained"
                    size="medium"
                    color="error"
                    onClick={(): void => onDeleteOrder(order.Order_ID)}
                >
                    X
                </Button>
            </div>
            <div className="card__item">
                <div className="card__name">Crust:</div>
                {order.Crust}
            </div>
            <div className="card__item">
                <div className="card__name">Flavor:</div>
                {order.Flavor}
            </div>
            <div className="card__item">
                <div className="card__name">Size:</div> {order?.Size}
            </div>
            <div className="card__item">
                <div className="card__name">Table:</div>
                {order.Table_No}
            </div>
            <div className="card__item">
                <div className="card__name">Time:</div>
                {order.Timestamp}
            </div>
        </div>
    );
};
