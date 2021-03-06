import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Link } from "react-router-dom";
import {useDispatch, useSelector} from "../../services/store";

import {Input, Button, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components'
import Loader from "../../components/Loader/Loader";
import {signIn} from "../../services/actions/authAction";

import styles from "./styles.module.css";


const Login = () => {
    const dispatch = useDispatch()
    const {request} = useSelector(state=> state.authState.auth)

    const [user, setUser] = useState({
        "email": "",
        "password": "",
    })
    const [errorInput, setInputError] = useState({
        "email": false,
        "password": false,
    })

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const submitForm = (e:FormEvent) => {
        e.preventDefault()
        user.password.length && user.email
            ? dispatch(signIn(user))
            : setInputError({
                "email": !user.email.length,
                "password": !user.password.length,
            })
    }

    return (
        request
            ? <Loader />
            : <div>
                <form className={'form'} onSubmit={submitForm} data-cy={'loginForm'}>
                    <div className={`text text_type_main-medium mb-6`}>Вход</div>
                    <div className={`formInput mb-6`} data-cy={'loginEmail'}>
                        <Input
                            type={'text'}
                            placeholder={'E-mail'}
                            onChange={e => onChange(e)}
                            value={user.email}
                            name={'email'}
                            error={errorInput.email}
                            errorText={"Ошибка в E-mail"}
                            size={'default'}

                        />
                    </div>
                    <div className={`formInput mb-6`} data-cy={'loginPassword'}>
                        <PasswordInput
                            onChange={e => onChange(e)}
                            value={user.password}
                            name={'password'}
                        />
                        {errorInput.password && <span className={styles.error}>Неверое или пустое поле</span>}
                    </div>
                    <Button type="primary" size="medium">
                        Войти
                    </Button>

                    <div className="pt-20">
                        <div className={'pb-4 formLink text text_type_main-default text_color_inactive'}>
                            Вы — новый пользователь?
                            <Link to={'/register'} className={'pl-2'}>
                                Зарегистрироваться
                            </Link>
                        </div>
                        <div className={'pb-4 formLink text text_type_main-default text_color_inactive'}>
                            Забыли пароль?
                            <Link to={'/forgot-password'} className={'pl-2'}>
                                Восстановить пароль
                            </Link>
                        </div>
                    </div>
                </form>
            </div>

    );
}

export default Login;