import React, {useState} from 'react';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {postResetPassword} from "../../services/actions/authAction";
import {errorProcessing} from "../../utils/consts";

const ResetPassword = () => {
    const dispath = useDispatch()
    const {sendingEmail, error, errorMessage} = useSelector(state => state.authState.auth)
    const [form, setForm] = useState({
        'password': '',
        'token': ''
    })
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispath(postResetPassword(form))
    }


    if (!sendingEmail) {
        return (
            <Redirect
                to={{
                    pathname: '/login'
                }}
            />
        );
    }

    return (
        <div>
            <form className={'form'} onSubmit={onSubmit}>
                <div className={`text text_type_main-medium mb-6`}>Восстановление пароля</div>
                {error && errorProcessing(errorMessage)}
                <div className={`formInput mb-6`}>
                    <PasswordInput
                        placeholder={'Введите новый пароль'}
                        onChange={onChange}
                        value={form.password}
                        name={'password'}
                    />
                </div>
                <div className={`formInput mb-6`}>
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={onChange}
                        value={form.token}
                        name={'token'}
                        error={false}
                        size={'default'}
                    />
                </div>
                <Button type="primary" size="medium">
                    Сохранить
                </Button>
                <div className="pt-20">
                    <div className={'pb-4 formLink text text_type_main-default text_color_inactive'}>
                        Вспомнили пароль?
                        <Link to={'/login'} className={'pl-2'}>
                            Войти
                        </Link>
                    </div>
                </div>

            </form>
        </div>
    );
}

export default ResetPassword;