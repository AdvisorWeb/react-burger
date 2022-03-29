import React from 'react';
import {NavLink, Link} from 'react-router-dom';

import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './styles.module.css'

const AppHeader = () => {
    return (
        <header className={"pt-4 pb-4 " + styles.header}>
            <div className="container">
                <div className={styles.wrp}>
                    <nav>
                        <NavLink
                            to={'/'}
                            exact
                            className={`pt-4 pb-4 pl-5 pr-5 mr-2 text text_type_main-default ${styles.link}`}
                            activeClassName={styles.linkActive}
                        >
                            <BurgerIcon type="secondary" size="medium"/>
                            <span className={'pl-2 text_color_inactive'}>Конструктор</span>
                        </NavLink>
                        <a className={'pt-4 pb-4 pl-5 pr-5 text text_type_main-default ' + styles.link} href={'#'}>
                            <ListIcon type="secondary" size="medium"/>
                            <span className={'pl-2 text_color_inactive'}>Лента заказов</span>
                        </a>
                    </nav>
                    <Link to="/" className={styles.logo}>
                        <Logo/>
                    </Link>
                    <nav>
                        <NavLink
                            className={`pt-4 pb-4 pl-5 pr-5 text text_type_main-default ${styles.link}`}
                            to={'/profile'}
                            activeClassName={styles.linkActive}
                        >
                            <ProfileIcon type="secondary" size="medium"/>
                            <span className={'pl-2 text_color_inactive'}>Личный кабинет</span>
                        </NavLink>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;