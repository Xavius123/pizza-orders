import axios, { AxiosPromise } from 'axios';
import { httpMethod } from '../enums/http-method.enum';
import { Login } from '../models';

const url = '/api/auth';

export const login = (request: Login): any => {
    // console.log('login', request);

    const payload = {
        username: 'test',
        password: 'test',
    };

    return httpRequest(url, httpMethod.Post, payload)
        .then((response: any) => {
            console.log('access_token', response.data.access_token);
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
    endpoint: string,
    methodType: string,
    payload: any
): AxiosPromise<any> =>
    axios({
        url: endpoint,
        method: methodType,
        data: payload,
    })
        .then((response: any) => response)
        .catch((error: any) => error);
