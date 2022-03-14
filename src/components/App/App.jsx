import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import AppHeader from "../AppHeader/AppHeader";
import { Home } from "../../pages/index";

import {getItems} from '../../services/actions/mainInfoAction'

import {Loader} from '../Loader/Loader'

const App = () => {
    const dispatch = useDispatch()
    const {isLoading, itemsFailed} = useSelector(store => store.info)

    useEffect(
        ()=>{
            dispatch(getItems())
        },[]
    )

    return (
        <>
            <AppHeader />
            <main className={'container'}>
                {
                    itemsFailed
                        ? <p  style={{ padding: '50px', textAlign: 'center' }} >Произошла ошибка или проблемы с интернетами</p>
                        :  !isLoading ? <Home /> : <Loader />

                }
            </main>
        </>
    );
}

export default App;
