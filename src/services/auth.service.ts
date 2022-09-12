import { httpMethod } from '../enums/http-method.enum';
import { Login } from '../models';
import { httpRequest } from './http.service';

const url = '/api/auth';

export const login = (request: Login): any => {
    const payload = {
        username: request.username,
        password: request.password,
    };

    return httpRequest(url, httpMethod.Post, payload)
        .then((response: any) => {
            if (response.data) {
                const { access_token } = response.data;
                console.log('AT', access_token);
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('isAuthenticated', 'true');
            }

            return response;
        })
        .catch((err: any) => err);
};
