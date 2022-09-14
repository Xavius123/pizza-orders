import { httpMethod } from '../enums';
import { OrderForm } from '../models';
import { httpRequest } from './http.service';

export const GetOrders = (): any => {
    const url = '/api/orders';
    return httpRequest(url, httpMethod.Get)
        .then((response: any) => {
            return response;
        })
        .catch((err: any) => err);
};

export const AddOrders = (request: OrderForm): any => {
    const url = '/api/orders';

    const payload = {
        Crust: request.Crust,
        Flavor: request.Flavor,
        Size: request.Size,
        Table_No: request.Table_No,
    };
    return httpRequest(url, httpMethod.Post, payload)
        .then((response: any) => {
            return response;
        })
        .catch((err: any) => err);
};

export const DeleteOrder = (orderId: number): any => {
    const url = `/api/orders/${orderId}`;
    return httpRequest(url, httpMethod.Delete)
        .then((response: any) => {
            return response;
        })
        .catch((err: any) => err);
};
