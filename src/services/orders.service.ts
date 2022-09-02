import axios, { AxiosPromise } from 'axios';
import { httpMethod } from '../enums/http-method.enum';

const baseURL = 'https://order-pizza-api.herokuapp.com/api/';

export const GetOrders = (request: string): any => {
    return request;
};

export const AddOrders = (request: string): any => {
    return request;
};

export const DeleteOrder = (order: number): any => {
    return order;
};
