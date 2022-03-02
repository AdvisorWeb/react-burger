import React, {useEffect, useState} from 'react';

import {url} from '../../utils/consts'
import AppHeader from "../AppHeader/AppHeader";
import { Home } from "../../pages/index";

import styles from './style.module.css'

function App() {

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const getData = () => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setData(data.data)
                setIsLoading(true)
            })
            .catch(e => {
                setIsLoading(false)
                console.log(e)
            });
    };

    useEffect(()=>{
        getData()
    },[])

    return (
        <>
            <AppHeader />
            <main className={'container'}>
                {
                    isLoading && data ? <Home ingredients={data}/> : <div className={styles.loaderWrp}><div className={styles.loader}></div></div>
                }
            </main>
        </>
    );
}

export default App;
