import React from 'react';

import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './styles.module.css'

const AppHeader = () => {
    return (
        <header className={"pt-4 pb-4 " + styles.header}>
            <div className="container">
                <div className={styles.wrp}>
                    <nav>
                        <a className={'pt-4 pb-4 pl-5 pr-5 mr-2 text text_type_main-default ' + styles.link} href={'#'}>
                            <BurgerIcon type="primary" size="medium"/>
                            <span className={'pl-2'} style={{color: '#fff'}}>Конструктор</span>
                        </a>
                        <a className={'pt-4 pb-4 pl-5 pr-5 text text_type_main-default ' + styles.link} href={'#'}>
                            <ListIcon type="secondary" size="medium"/>
                            <span className={'pl-2 text_color_inactive'}>Лента заказов</span>
                        </a>
                    </nav>
                    <a href="/" className={styles.logo}>
                        <Logo/>
                    </a>
                    <nav>
                        <a className={'pt-4 pb-4 pl-5 pr-5 text text_type_main-default ' + styles.link} href={'#'}>
                            <ProfileIcon type="secondary" size="medium"/>
                            <span className={'pl-2 text_color_inactive'}>Личный кабинет</span>
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;