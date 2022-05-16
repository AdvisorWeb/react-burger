import React, {useEffect} from 'react';
import FeedItems from "../../components/FeedItems/FeedItems";
import {feedUrl} from "../../utils/consts";
import {wsConnectionClosed, wsConnectionStart} from "../../services/actions/wsActions";
import {useDispatch, useSelector} from "../../services/store";
import FeedBoard from "../../components/FeedBoard/FeedBoard";

import styles from './style.module.css'
import Loader from "../../components/Loader/Loader";

const Feed = () => {
    const dispatch = useDispatch()
    const {wsConnected, personal, isLoaded} = useSelector(store => store.ws)

    useEffect(() => {
        (!wsConnected || personal) && dispatch(wsConnectionStart(feedUrl, false))
        return () => {
           dispatch(wsConnectionClosed())
        }
    }, []);

    return (
        <>
            <h1 className='pt-10 pb-5 text text_type_main-large'>
                Лента заказов
            </h1>
            {
                isLoaded
                    ? <div className={styles.wrp}>
                        <FeedItems/>
                        <FeedBoard/>
                    </div>
                    : <Loader/>
            }
        </>

    );
}

export default Feed;