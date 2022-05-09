import React, {ChangeEvent, FormEvent, MouseEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {NavLink, Redirect, useLocation} from "react-router-dom";

import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components'
import {logOut, getUser, refreshInfo} from "../../services/actions/authAction";
import Loader from "../../components/Loader/Loader";

import {IStore, TInputState} from "../../utils/tsTypes";

import styles from './styles.module.css'
import Sidebar from "../../components/Sidebar/Sidebar";

const Profile = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const {request, user} = useSelector((state: IStore) => state.authState.auth)
    const {authorization, authorizationCheck} = useSelector((state: IStore) => state.authState)
    const [edit, setEdit] = useState<boolean>(false)
    const [form, setForm] = useState<TInputState<string>>({
        email: '',
        name: '',
        password: ''
    })
    const [inputState, setInputState] = useState<TInputState<boolean>>({
        email: true,
        name: true,
        password: true
    })


    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onIconClick = (type: string) => {
        setInputState({
            ...inputState,
            // @ts-ignore
            [type]: !inputState[type]
        })
        setEdit(true)
    }

    const resetForm = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setForm({
            ...form,
            email: user.email,
            name: user.name,
            password: ''
        })
    }

    const submitForm = (e: FormEvent) => {
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
        !authorizationCheck
            ? <Loader/>
            : <div className={`${styles.profileWrp}`}>
                <Sidebar />
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

    );
}

export default Profile;