import axios, { AxiosPromise } from 'axios';
import { httpMethod } from '../enums/http-method.enum';
import { Login } from '../models';

const baseURL = 'https://order-pizza-api.herokuapp.com/api/';

export const login = (request: Login): any => {
    // console.log('login', request);
    const endpointUrl = 'auth';

    // const headers = {
    //     'Access-Control-Allow-Origin': 'https://localhost:3000/',
    // };

    // const payload = {
    //     username: 'test',
    //     password: 'test',
    // };

    // return httpRequest(endpointUrl, httpMethod.Post, headers, payload)
    //     .then((response: any) => {
    //         console.log(response);
    //         // if (response.access_token) {
    //         //     const { access_token } = response.access_token;
    //         //     console.log("AT", access_token)
    //         //     localStorage.setItem('access_token', access_token);
    //         //     localStorage.setItem('isAuthenticated', 'true');
    //         // }

    //         return response;
    //     })
    //     .catch((err: any) => err);
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
