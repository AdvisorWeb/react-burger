import React from "react";

export const baseUrl = 'https://norma.nomoreparties.space/api'

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export function getCookie(name) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, props) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function deleteCookie(name) {
    setCookie(name, null, { expires: -1 });
}

export const errorProcessing = (errorMessage) => {
    let message = ''
    switch (errorMessage) {
        case 'Ошибка 401': {
            message = 'Неправильный логин или пароль'
            break
        }
        case 'Ошибка 403': {
            message = 'Данный пользователь уже существует'
            break
        }
        case 'Ошибка 404': {
            message = 'Неверные данные'
            break
        }

        default: {
            message = 'Ошибка'
            break
        }
    }

    return <span className={'errorMessage'}>{message}</span>

}
