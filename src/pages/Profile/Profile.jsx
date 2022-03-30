import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {NavLink, Redirect, useLocation} from "react-router-dom";
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'

import {logOut, getUser, refreshInfo, refreshToken} from "../../services/actions/authAction";
import Loader from "../../components/Loader/Loader";

import styles from './styles.module.css'
import {errorProcessing} from "../../utils/consts";

const Profile = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const {request, user} = useSelector(state => state.authState.auth)
    const {authorization, authorizationCheck, cookies} = useSelector(state => state.authState)

    const [edit, setEdit] = useState(false)
    const [form, setForm] = useState({
        email: '',
        name: '',
        password: ''
    })
    const [inputState, setInputState] = useState({
        email: true,
        name: true,
        password: true
    })


    const handlerLogOut = () => {
        dispatch(logOut())
    }

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onIconClick = (type) => {
        setInputState({
            ...inputState,
            [type]: !inputState[type]
        })
        setEdit(true)
    }

    const resetForm = (e) => {
        e.preventDefault()
        setForm({
            ...form,
            email: user.email,
            name: user.name,
            password: ''
        })
    }

    const submitForm = (e) => {
        e.preventDefault()
        setForm({
            ...form,
            email: user.email,
            name: user.name,
        })
        dispatch(refreshInfo(form))
    }


    useEffect(
        () => {
            authorizationCheck && authorization && dispatch(getUser())
            setForm({
                ...form,
                email: user.email,
                name: user.name,
            })

        }, [authorizationCheck]
    )
    useEffect(
        () => {
            setEdit(false)
            setInputState({
                email: true,
                name: true,
                password: true
            })
            setForm({
                ...form,
                email: user.email,
                name: user.name,
            })

        }, [request]
    )

    if (authorizationCheck && !authorization) {
        return (
            <Redirect
                to={{
                    pathname: '/login',
                    state: {from: location}
                }}
            />
        )
    }


    return (
        request
            ? <Loader/>
            : cookies
            ? <div className={`${styles.profileWrp}`}>
                <div className={`${styles.sidebar} mr-15`}>
                    <ul className={'mb-20'}>
                        <li className={styles.li}>
                            <NavLink
                                to={'/profile'}
                                className={`${styles.link} text text_type_main-medium`}
                                activeClassName={styles.linkActive}
                            >
                                Профиль
                            </NavLink>
                        </li>
                        <li className={styles.li}>
                            <NavLink
                                to={'/orders'}
                                className={`${styles.link} text text_type_main-medium`}
                                activeClassName={styles.linkActive}
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
                <form action="" className={`${styles.form}`} onSubmit={submitForm}>
                    <div className={`mb-6`}>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={e => onChange(e)}
                            icon={inputState.name ? 'EditIcon' : 'CheckMarkIcon'}
                            value={form.name}
                            name={'name'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                            onIconClick={(el) => onIconClick('name')}
                            disabled={inputState.name}
                        />
                    </div>
                    <div className={`mb-6`}>
                        <Input
                            type={'text'}
                            placeholder={'Логин'}
                            onChange={e => onChange(e)}
                            icon={inputState.email ? 'EditIcon' : 'CheckMarkIcon'}
                            value={form.email}
                            name={'email'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                            onIconClick={(el) => onIconClick('email')}
                            disabled={inputState.email}
                        />
                    </div>
                    <div className={`mb-6`}>
                        <Input
                            type={'password'}
                            placeholder={'Пароль'}
                            onChange={e => onChange(e)}
                            icon={inputState.password ? 'EditIcon' : 'CheckMarkIcon'}
                            value={form.password}
                            name={'password'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                            onIconClick={(el) => onIconClick('password')}
                            disabled={inputState.password}
                        />
                    </div>
                    {
                        edit &&
                        <div className={styles.formBtns}>
                            <button
                                onClick={resetForm}
                                className={styles.formBtn}
                            >
                                Отмена
                            </button>
                            <Button
                                type="primary" size="medium"
                            >Сохранить</Button>
                        </div>
                    }
                </form>
            </div>
            : <Loader/>

    );
}

export default Profile;