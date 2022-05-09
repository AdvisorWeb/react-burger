import React, { useEffect } from 'react';

import {Link, Redirect, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {IStore} from "../../utils/tsTypes";
import Sidebar from "../../components/Sidebar/Sidebar";
import {Scrollbar} from "smooth-scrollbar-react";
import { wsConnectionStart} from "../../services/actions/wsActions";
import {getCookie, getStatus, initScroll, itemImages, itemPrice, orderUrl} from "../../utils/consts";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './style.module.css'
import Loader from "../../components/Loader/Loader";

export const History = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const scrollContainer = React.useRef(null);
    const {authorization, authorizationCheck} = useSelector((state: IStore) => state.authState)
    const {wsConnected, orders, personal, isLoaded} = useSelector((store: IStore) => store.ws)
    const {items} = useSelector((store: IStore) => store.info)

    useEffect(() => {
        initScroll(scrollContainer.current, [])
    }, [initScroll, isLoaded]);


    useEffect(() => {
        if(authorizationCheck && authorization){
            const url = `${orderUrl}?token=${getCookie('token')}`
            const bool = (!personal || !wsConnected)

            bool && dispatch(wsConnectionStart(url, true))
        }
    }, [personal, authorization]);

    if (authorizationCheck && !authorization) {
        return (
            <Redirect
                to={{
                    pathname: '/login',
                    state: {from: location}
                }}
            />
        )
    }

    return (
        <div className={`${styles.profileWrp}`}>
            <Sidebar />
            {
                isLoaded
                    ?  <div className={`${styles.historyWrp}`}  ref={scrollContainer}>
                        {
                            orders && !orders.length
                                ? <p>Нет заказов</p>
                                :  <Scrollbar className={`${styles.h100} mr-4`}>
                                    {
                                        orders && orders.map((order) => {
                                            return (
                                                <Link
                                                    key={order._id}
                                                    to={{
                                                        pathname: `/profile/orders/${order._id}`,
                                                        state: {background: location},
                                                    }}>
                                                    <div className={`${styles.feedItem} p-6 mb-4`} key={order._id}>
                                                        <div className={`${styles.feedItemWrp} pb-6`}>
                                                            <div className="text text_type_digits-default">
                                                                #{order.number}
                                                            </div>
                                                            <div className="text text_type_main-default text_color_inactive">
                                                                {order.createdAt}
                                                            </div>
                                                        </div>
                                                        <div className="text text_type_main-medium  pb-2">
                                                            {order.name}
                                                        </div>
                                                        <div className={`${order.status === 'done' && styles.color} text text_type_main-default pb-6`}>
                                           <span>
                                               { getStatus(order.status) }
                                           </span>
                                                        </div>
                                                        <div className={`${styles.feedItemWrp}`}>
                                                            <div className={`${styles.feedImg}`}>
                                                                {
                                                                    itemImages(order.ingredients, items)
                                                                }

                                                            </div>
                                                            <div className={`${styles.price} pl-6`}>
                                            <span className='pr-2 text text_type_digits-default'>
                                                {
                                                    itemPrice(order.ingredients, items)
                                                }
                                            </span>
                                                                <CurrencyIcon type="primary"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    }
                                </Scrollbar>
                        }

                    </div>
                    : <Loader />
            }
        </div>
    );
}

export default History;