import React, {useEffect, useMemo} from 'react';
import {Scrollbar} from 'smooth-scrollbar-react';
import {v4 as uuidv4} from "uuid";
import styles from './style.module.css'
import {useSelector} from "../../services/store";
import {getArray, initScroll} from "../../utils/consts";
import Loader from "../Loader/Loader";

export type TOrder = {
    createdAt: string
    ingredients: string[]
    name: string
    number: number
    status: string
    updatedAt: string
    _id: string
}

const FeedBoard = () => {
    const {wsConnected, total, totalToday, orders} = useSelector(store => store.ws)
    const scrollContainer = React.useRef(null);

    const orderDone = useMemo(
        ()=> {
            return getArray("done", orders, 10, wsConnected)
        }, [orders, wsConnected]
    )
    const orderInWork = useMemo(
        ()=> {
            return getArray("pending", orders, 10, wsConnected)
        }, [orders, wsConnected]
    )


    const loader = useMemo(
        () => {
            return (
                <div className={styles.w50}>
                    <Loader/>
                </div>
            )
        }, [orders])


    useEffect(() => {
        initScroll(scrollContainer.current, [])
    }, [orders]);

    return (
        orders.length
            ? <div className={styles.w50} ref={scrollContainer}>
                <div className={styles.h100}>
                    <Scrollbar
                        className={`${styles.h100}`}
                    >
                        {
                            orderDone && orderDone.length &&
                            <div className={`${styles.list}`}>
                                <div
                                    className={`${styles.name} text text_type_main-medium pb-6`}
                                >
                                    Готовы:
                                </div>
                                <ul className={styles.ul} key={uuidv4()}>
                                    {
                                        orderDone.map(order => {
                                            return (
                                                <li key={uuidv4()}
                                                    className={`${styles.color} text text_type_digits-default pb-2`}>
                                                    {order}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>

                            </div>
                        }
                        {
                            orderInWork && orderInWork.length &&
                            <div className={`${styles.list}`}>
                                <div
                                    className={`${styles.name} text text_type_main-medium pb-6`}
                                >
                                    В работе:
                                </div>
                                <ul className={styles.ul} key={uuidv4()}>
                                    {
                                        orderInWork.map(order => {
                                            return (
                                                <li key={uuidv4()}
                                                    className={`text text_type_digits-default pb-2`}>
                                                    {order}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>

                            </div>
                        }

                        <div className={`${styles.total} pb-15 pt-15`}>
                            <div className={`${styles.totalName} text text_type_main-medium`}>
                                Выполнено за все время:
                            </div>
                            <div className={`${styles.totalNum} text text_type_digits-large`}>
                                {total}
                            </div>
                        </div>
                        <div className={`${styles.total}`}>
                            <div className={`${styles.totalName} text text_type_main-medium`}>
                                Выполнено за сегодня:
                            </div>
                            <div className={`${styles.totalNum} text text_type_digits-large`}>
                                {totalToday}
                            </div>
                        </div>
                    </Scrollbar>

                </div>
            </div>
            : loader


    );
}

export default FeedBoard;