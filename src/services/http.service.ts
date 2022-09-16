import axios, { AxiosPromise } from 'axios';
import { httpMethod } from '../enums/http-method.enum';

const token = localStorage.getItem('access_token');

export const httpRequest = (
    endpoint: string,
    methodType: httpMethod,
    payload?: any
): AxiosPromise<any> =>
    axios({
        url: endpoint,
        method: methodType,
        data: payload,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response: any) => response)
        .catch((error: any) => error);
