import React from 'react';

import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './styles..module.css'

function AppHeader() {
    return (
        <header className={"pt-4 pb-4 " + styles.header}>
            <div className="container">
                <div className={styles.wrp}>
                    <nav>
                        <button className={'pt-4 pb-4 pl-5 pr-5 mr-2 ' + styles.button}>
                            <BurgerIcon type="primary" size="medium"/>
                            <span className={'pl-2'} style={{color: '#fff'}}>Конструктор</span>
                        </button>
                        <button className={'pt-4 pb-4 pl-5 pr-5 ' + styles.button}>
                            <ListIcon type="secondary" size="medium"/>
                            <span className={'pl-2 text_color_inactive'}>Лента заказов</span>
                        </button>
                    </nav>
                    <a href="/" className={styles.logo}>
                        <Logo/>
                    </a>
                    <nav>
                        <button className={'pt-4 pb-4 pl-5 pr-5 ' + styles.button}>
                            <ProfileIcon type="secondary" size="medium"/>
                            <span className={'pl-2 text_color_inactive'}>Личный кабинет</span>
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;