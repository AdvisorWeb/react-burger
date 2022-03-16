import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import AppHeader from "../AppHeader/AppHeader";
import { Home } from "../../pages/index";

import {getItems} from '../../services/actions/mainInfoAction'

import {Loader} from '../Loader/Loader'

import styles from './style.module.css'

const App = () => {
    const dispatch = useDispatch()
    const {isLoading, itemsFailed} = useSelector(store => store.info)

    useEffect(
        ()=>{
            dispatch(getItems())
        },[dispatch]
    )

    return (
        <>
            <AppHeader />
            <main className={'container'}>
                {
                    itemsFailed
                        ? <p  className={styles.error} >Произошла ошибка или проблемы с интернетами</p>
                        :  !isLoading ? <Home /> : <Loader />

                }
            </main>
        </>
    );
}

export default App;
