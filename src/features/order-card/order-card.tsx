import { Button } from '@mui/material';
import React, { ReactElement, useState } from 'react';
import './order-card.scss';
import { useAppDispatch } from '../../hooks/hooks';
import { DeleteOrderAsync } from '../../slices/orders.slice';
import { Order } from '../../models';

interface OrderCardProps {
    order: Order;
    i: number;
}

export const OrderCard = (props: OrderCardProps): ReactElement => {
    const { order, i } = props;
    const dispatch = useAppDispatch();
    const [meridiem, setMeridiem] = useState('AM');
    const onDeleteOrder = (orderNumber: number): void => {
        dispatch(DeleteOrderAsync(orderNumber));
    };

    const getDateTime = (timeStamp: string): string => {
        let newTime = '';
        const time = new Date(timeStamp);

        const minutes = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();
        const month = time.getMonth() + 1;
        const day = time.getUTCDate();
        const seconds = time.getUTCSeconds();
        let hours = time.getHours();

        if (hours > 12) {
            hours -= 12;
        } else if (hours === 0) {
            hours = 12;
            setMeridiem('PM');
        }

        newTime = `${month}/${day} ${hours}:${minutes}:${seconds} ${meridiem}`;

        return newTime;
    };

    return (
        <div key={i + 1} className="card">
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
