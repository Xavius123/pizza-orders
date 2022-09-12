import { httpMethod } from '../enums';
import { OrderForm } from '../models';
import { httpRequest } from './http.service';

export const GetOrders = (): any => {
    const url = '/api/orders';
    const payload = {};
    return httpRequest(url, httpMethod.Get, payload)
        .then((response: any) => {
            console.log(response);
            return response;
        })
        .catch((err: any) => err);
};

export const AddOrders = (request: OrderForm): any => {
    const url = '/api/orders';
    const payload = {};
    return httpRequest(url, httpMethod.Post, payload)
        .then((response: any) => {
            console.log(response);
            return response;
        })
        .catch((err: any) => err);
};

export const DeleteOrder = (orderId: number): any => {
    const url = `/api/orders/${orderId}`;
    const payload = {};
    return httpRequest(url, httpMethod.Delete, payload)
        .then((response: any) => {
            console.log(response);
            return response;
        })
        .catch((err: any) => err);
};
