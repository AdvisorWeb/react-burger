import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from "../../components/Loader/Loader";

import {registerUser} from '../../services/actions/authAction'

import {IStore, TInputState} from "../../utils/tsTypes";
import {errorProcessing} from "../../utils/consts";

import styles from './styles.module.css'


const Register = () => {
    const dispatch = useDispatch()
    const {request, error, errorMessage} = useSelector((state: IStore) => state.authState.auth)
    const [user, setUser] = useState<TInputState<string>>({
        "email": "",
        "password": "",
        "name": ""
    })
    const [errorInput, setInputError] = useState<TInputState<boolean>>({
        "email": false,
        "password": false,
        "name": false
    })
    const onChange = (e:any) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        setInputError({
            ...errorInput,
            [e.target.name]: !e.target.value.length,
        })
    }

    const submitForm = (e:any) => {
        e.preventDefault()
        user.name.length && user.password.length > 5 && user.email
            ? dispatch(registerUser(user))
            : setInputError({
                "email": !user.email.length,
                "password": !user.password.length,
                "name": !user.name.length
            })
    }

    return (
        request
            ? <Loader/>
            : <div>
                <form className={'form'} onSubmit={submitForm}>
                    <div className={`text text_type_main-medium mb-6`}>Регистрация</div>
                    {error && errorProcessing(errorMessage)}
                    <div className={`formInput mb-6`}>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={e => onChange(e)}
                            value={user.name}
                            name={'name'}
                            size={'default'}
                            error={errorInput.name}
                        />
                    </div>
                    <div className={`formInput mb-6`}>
                        <Input
                            type={'text'}
                            placeholder={'E-mail'}
                            onChange={e => onChange(e)}
                            value={user.email}
                            name={'email'}
                            size={'default'}
                            error={errorInput.email}
                        />
                    </div>
                    <div className={`formInput mb-6`}>
                        <PasswordInput
                            onChange={e => onChange(e)}
                            value={user.password}
                            name={'password'}
                        />
                        {errorInput.password && <span className={styles.error}>Неверое или пустое поле</span>}
                    </div>
                    <Button type="primary" size="medium">
                        Зарегистрироваться
                    </Button>
                    <div className="pt-20">
                        <div className={'pb-4 formLink text text_type_main-default text_color_inactive'}>
                            Уже зарегистрированы?
                            <Link to={'/login'} className={'pl-2'}>
                                Войти
                            </Link>
                        </div>
                    </div>

                </form>
            </div>

    );
}

export default Register;