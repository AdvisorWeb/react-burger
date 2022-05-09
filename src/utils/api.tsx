import {getCookie, baseUrl, deleteCookie, setCookie} from './consts';
import {TInputState, TDataAccess} from "./tsTypes";

export const registrationUserRequest = async (form:TInputState<string>) => {
    return await fetch(`${baseUrl}/auth/register `, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    });
};

export const loginRequest = async (form:TInputState<string>) => {
    return await fetch(`${baseUrl}/auth/login `, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    });
};

export const getUserInfo = async () => {
    return await fetch(`${baseUrl}/auth/user/`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });
}

export const logoutRequest = async () => {
    const refreshToken: object = {token: getCookie('refreshToken')}
    return await fetch(`${baseUrl}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(refreshToken)
    });
};

export const refreshTokenRequest = () => {
    const refreshToken: object = {token: getCookie('refreshToken')}
    return fetch(`${baseUrl}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(refreshToken)
    })
}

export const forgotPassword = (email:string) => {
    const data: object = { email : email}
    return fetch(`${baseUrl}/password-reset`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })
}

export const resetPassword = (form:{password:string, token:string}) => {
    const data = { password : form.password, token: form.token}
    return fetch(`${baseUrl}/password-reset/reset`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })
}

export const patсhInfo = async (form:TInputState<string>) => {
     return await fetch(`${baseUrl}/auth/user/`, {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    });
}

export const cookiesProcessing = (data:TDataAccess) => {
    let authToken;
    if (data.accessToken.indexOf('Bearer') === 0) {
        authToken = data.accessToken.split('Bearer ')[1]
    }
    if (authToken) {
        deleteCookie('token');
        deleteCookie('refreshToken');
        setCookie('token', authToken);
        setCookie('refreshToken', data.refreshToken);
    }
    return data;
}

export const postOrder = (order: string[]) => {
    const data = {
        "ingredients": order
    }
    return fetch(`${baseUrl}/orders`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie('token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })
}



