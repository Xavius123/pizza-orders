import axios, { AxiosPromise } from 'axios';
import { httpMethod } from '../enums/http-method.enum';

const baseURL = 'https://order-pizza-api.herokuapp.com/api/';

export const GetOrders = (request: string): any => {
    console.log(request);
    const endpointUrl = 'auth';

    const headers = {
        'Access-Control-Allow-Origin': 'https://localhost:3000/',
    };

    const payload = {
        username: 'test',
        password: 'test',
    };

    return httpRequest(endpointUrl, httpMethod.Post, headers, payload)
        .then((response: any) => {
            console.log(response);
            // if (response.access_token) {
            //     const { access_token } = response.access_token;
            //     console.log("AT", access_token)
            //     localStorage.setItem('access_token', access_token);
            //     localStorage.setItem('isAuthenticated', 'true');
            // }

            return response;
        })
        .catch((err: any) => err);
};

export const AddOrders = (request: string): any => {
    console.log(request);
    const endpointUrl = 'auth';

    const headers = {
        'Access-Control-Allow-Origin': 'https://localhost:3000/',
    };

    const payload = {
        username: 'test',
        password: 'test',
    };

    return httpRequest(endpointUrl, httpMethod.Post, headers, payload)
        .then((response: any) => {
            console.log(response);
            // if (response.access_token) {
            //     const { access_token } = response.access_token;
            //     console.log("AT", access_token)
            //     localStorage.setItem('access_token', access_token);
            //     localStorage.setItem('isAuthenticated', 'true');
            // }

            return response;
        })
        .catch((err: any) => err);
};

export const DeleteOrder = (order: number): any => {
    console.log(order);
    const endpointUrl = 'auth';

    const headers = {
        'Access-Control-Allow-Origin': 'https://localhost:3000/',
    };

    const payload = {
        username: 'test',
        password: 'test',
    };

    return httpRequest(endpointUrl, httpMethod.Post, headers, payload)
        .then((response: any) => {
            console.log(response);
            // if (response.access_token) {
            //     const { access_token } = response.access_token;
            //     console.log("AT", access_token)
            //     localStorage.setItem('access_token', access_token);
            //     localStorage.setItem('isAuthenticated', 'true');
            // }

            return response;
        })
        .catch((err: any) => err);
};

const httpRequest = (
    endpointUrl: string,
    method: httpMethod,
    headers: any,
    data: any
): AxiosPromise<any> =>
    axios({
        baseURL: baseURL,
        url: endpointUrl,
        method,
        headers,
        data,
        withCredentials: true,
        responseType: 'json',
    })
        .then((response: any) => response)
        .catch((error: any) => error);
