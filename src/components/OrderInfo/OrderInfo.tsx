import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {IStore, TItem} from "../../utils/tsTypes";
import Loader from "../Loader/Loader";
import { wsConnectionStart} from "../../services/actions/wsActions";
import {feedUrl, getCookie, initScroll, orderUrl} from "../../utils/consts";

import styles from './style.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {v4 as uuidv4} from "uuid";
import {Scrollbar} from "smooth-scrollbar-react";


interface IOrderInfo {
    inPage: boolean
}

interface ILocation {
    pathname: string
    state?: {
        background: {
            pathname: string
        }
    }

}

const OrderInfo = ({inPage}: IOrderInfo) => {
    const dispatch = useDispatch()
    const location: ILocation = useLocation()

    const scrollContainer = React.useRef(null);

    const {items} = useSelector((store: IStore) => store.info)
    const cloneItems = items.map(item => JSON.parse(JSON.stringify(item)))

    const toReplace: string = location.pathname.includes('profile') ?`/profile/orders/` : '/feed/'
    const url: string = location.pathname.includes('profile') ? `${orderUrl}?token=${getCookie('token')}` : feedUrl
    const orderState: boolean = location.pathname.includes('profile')

    const orderId: string = location.pathname.replace(toReplace, '')

    const {orders, wsConnected} = useSelector((state: IStore) => state.ws)
    const selectedObject = orders.filter(el => el._id == orderId).shift()

    let ingredients: (TItem)[] = []
    selectedObject && selectedObject.ingredients.map((id) => {
        let flag = true
        const item = cloneItems.filter(el => el._id === id).shift()
        if (item) {
            if (item.type === "bun") {
                item.count = 2
                if (ingredients.includes(item)) {
                    flag = false
                }
            } else {
                if (ingredients.includes(item)) {
                    item.count += 1
                    flag = false
                } else {
                    item.count = 1;
                }
            }
            if (flag) {
                ingredients = [...ingredients, item]
            }
        }
    })

    const itemPrice = (): number => {
        let price = 0
        ingredients.map((item) => {
            price += item.price * item.count;
        })
        return price
    }

    useEffect(() => {
        !wsConnected && inPage && dispatch(wsConnectionStart(url, orderState))
    }, [dispatch]);

    return (
        !wsConnected
            ? <Loader/>
            : <div className={`${inPage && styles.wrp}`}>
                <div className={`${inPage && styles.num} text text_type_digits-default pb-10`}>
                    #{selectedObject && selectedObject.number}
                </div>
                <div className={`${styles.name} pb-3 text text_type_main-medium`}>
                    {selectedObject && selectedObject.name}
                </div>
                <div className={`${styles.status} pb-15 text text_type_main-default`}>
                    {selectedObject && selectedObject.status === 'done'
                        ? <span className={`${styles.color} text text_type_main-default`}>Выполнен</span>
                        : <span className={'text text_type_main-default'}>dsd</span>
                    }
                </div>
                <div className={`${styles.naming} pb-6 text text_type_main-medium`}>
                    Состав:
                </div>
                <Scrollbar className={`${styles.list}  mr-4 pb-6`} ref={scrollContainer} >
                    {
                        ingredients.map(item => {
                            const {image, name, count, price} = item
                            return (
                                <div className={`${styles.listBlock} pb-4`} key={uuidv4()}>
                                    <div className={styles.imgBg}>
                                        <img className={styles.img} src={image} alt=""/>
                                    </div>
                                    <div className={`${styles.listBlockName} pl-4`}>
                                        {name}
                                    </div>
                                    <div className={`${styles.listBlockPrice} pl-4`}>
                                        <span className={'pr-2 text text_type_digits-default'}>
                                              {count} x {price}
                                        </span>
                                        <CurrencyIcon type={"primary"}/>
                                    </div>

                                </div>
                            )
                        })
                    }
                </Scrollbar>
                <div className={`${styles.footer} pt-10`}>
                    <div className={`${styles.time} pb-6 text text_type_main-default text_color_inactive`}>
                        {selectedObject && selectedObject.createdAt}
                    </div>
                    <div className={`${styles.price} pb-6`}>
                        <span className={`text text_type_digits-default pr-2`}>
                            {itemPrice()}
                        </span>
                        <CurrencyIcon type={"primary"}/>
                    </div>
                </div>

            </div>

    );
}

export default OrderInfo;