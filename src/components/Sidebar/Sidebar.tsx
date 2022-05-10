import React from 'react';
import styles from "./style.module.css";
import {NavLink} from "react-router-dom";
import {logOut} from "../../services/actions/authAction";
import {useDispatch} from "../../services/store";

const Sidebar = () => {
    const dispatch = useDispatch()
    const handlerLogOut = () => {
        dispatch(logOut())
    }
    return (
        <div className={`${styles.sidebar} mr-15`}>
            <ul className={'mb-20'}>
                <li className={styles.li}>
                    <NavLink
                        to={'/profile'}
                        className={`${styles.link} text text_type_main-medium`}
                        activeClassName={styles.linkActive}
                        exact={true}
                    >
                        Профиль
                    </NavLink>
                </li>
                <li className={styles.li}>
                    <NavLink
                        to={'/profile/orders'}
                        className={`${styles.link} text text_type_main-medium`}
                        activeClassName={styles.linkActive}
                        exact={true}
                    >
                        История заказов
                    </NavLink>
                </li>
                <li className={styles.li}>
                    <button
                        onClick={handlerLogOut}
                        className={`${styles.link} text text_type_main-medium`}
                    >
                        Выход
                    </button>
                </li>
            </ul>
            <div className={'text text_type_main-default text_color_inactive '}>
                В этом разделе вы можете
                изменить свои персональные данные
            </div>
        </div>
    );
}

export default Sidebar;