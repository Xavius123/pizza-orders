import axios, { AxiosPromise } from 'axios';
import { httpMethod } from '../enums/http-method.enum';
import { OrderForm } from '../models';

const baseURL = 'https://order-pizza-api.herokuapp.com/api/';

export const GetOrders = (): any => {
    const endpointUrl = 'orders';
    const response = '';
    // httpMethod.Get
    return response;
};

export const AddOrders = (request: OrderForm): any => {
    const endpointUrl = 'orders';
    const response = '';
    // httpMethod.Post
    return response;
};

export const DeleteOrder = (orderId: number): any => {
    const endpointUrl = `orders/${orderId}`;
    // httpMethod.Delete
    return orderId;
};
