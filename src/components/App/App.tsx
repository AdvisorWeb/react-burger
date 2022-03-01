import React, {useEffect, useState} from 'react';

import AppHeader from "../AppHeader/AppHeader";
import { Home } from "../../pages/index";

import styles from './style.module.css'

function App() {
    const url = 'https://norma.nomoreparties.space/api/ingredients'
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const getData = async () => {
        await fetch(url)
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
