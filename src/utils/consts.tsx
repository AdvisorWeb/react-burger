import React, {ReactElement, ReactNode} from "react";
import styles from "../pages/History/style.module.css";
import {v4 as uuidv4} from "uuid";
import {TItem} from "./tsTypes";
import {TOrder} from "../components/FeedBoard/FeedBoard";

export const baseUrl: string = 'https://norma.nomoreparties.space/api'
export const feedUrl: string = 'wss://norma.nomoreparties.space/orders/all'
export const orderUrl: string = 'wss://norma.nomoreparties.space/orders'

export const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export function getCookie(name: string) {
    return localStorage.getItem(name)
}

export function setCookie(name: string, value: string) {
    localStorage.setItem(name, value)
}

export function deleteCookie(name: string) {
    setCookie(name, '');
}

export const errorProcessing = (errorMessage: string): ReactElement => {
    let message: string = ''
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

    return <span className={'errorMessage'}> {message} </span>

}

export const initScroll = (scrollContainer: HTMLElement | null, negativeItems: (HTMLElement | null)[]): void => {
    setTimeout(() => {
        if (scrollContainer) {
            const scrollContainerTop: number = scrollContainer.getBoundingClientRect().top || 0;
            let negativeScrollHeight: number = 0
            negativeItems && negativeItems.forEach((item): number => negativeScrollHeight += item ? item && item.getBoundingClientRect().height : 0)
            const maxHeight: number = window.innerHeight - scrollContainerTop - 40 - negativeScrollHeight
            scrollContainer.style.height = `${maxHeight}px`
        }
    }, 0)
}

export const itemImages = (array: string[], items: TItem[]): ReactNode => {
    return array.map((id: string) => {
        const item = items.filter(el => el._id === id)[0];
        return (
            item && <div className={styles.imgBg} key={uuidv4()}>
                <img className={styles.img} src={item.image} alt=""/>
            </div>
        );
    });
}

export const itemPrice = (array: string[], items: TItem[]): number => {
    let price = 0
    let bun = false
    array.map((id: string) => {
        const item = items.filter(el => el._id === id)[0]
       if( item){
           if (item.type === 'bun') {
               if (!bun) {
                   price += item.price * 2;
                   bun = true
               }
           } else {
               price += item.price;
           }
       }
    })
    return price
}

export const getStatus = (status: string): string => {
    if (status === 'created') {
        return 'Создан'
    } else if (status === 'pending') {
        return 'Готовится'
    } else {
        return 'Выполнен'
    }
}

export const getArray = (status: string, array: TOrder[], arrayLength: number, bool: boolean) => {
    if (bool) {
        const orders = array.filter(el => el.status === status && el.number).map(item => item.number).slice(0, arrayLength)
        if (orders.length) {
            return orders
        } else {
            return false
        }
    } else {
        return false
    }
}