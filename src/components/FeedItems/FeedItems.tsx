import React, { useEffect } from 'react';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Scrollbar} from 'smooth-scrollbar-react';
import styles from './style.module.css'
import {initScroll, itemImages, itemPrice} from "../../utils/consts";
import {useSelector} from "react-redux";
import {IStore} from "../../utils/tsTypes";
import {Link, useLocation} from "react-router-dom";

export const FeedItems = () => {
    const location = useLocation();
    const scrollContainer = React.useRef(null);
    const {orders} = useSelector((store: IStore) => store.ws)
    const {items} = useSelector((store: IStore) => store.info)

    useEffect(() => {
        initScroll(scrollContainer.current, [])
    }, [initScroll]);

    return (
        <div className={`${styles.feedItems}`} ref={scrollContainer}>
            <div className={`${styles.h100} pr-2 pl-2`} >
                <Scrollbar className={`${styles.h100} mr-4`}>
                    {
                        orders.map((order) => {
                            return (
                                <Link
                                    key={order._id}
                                    to={{
                                        pathname: `/feed/${order._id}`,
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
                                        <div className="text text_type_main-medium  pb-6">
                                            {order.name}
                                        </div>
                                        <div className={`${styles.feedItemWrp}`}>
                                            <div className={`${styles.feedImg}`}>
                                                {
                                                    order.ingredients && itemImages(order.ingredients, items)
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
            </div>
        </div>
    );
}

export default FeedItems;