import React, {FormEvent, useState} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";

import {useDispatch, useSelector} from "../../services/store";
import {postForgotPassword} from "../../services/actions/authAction";

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState<string>('');
    const {sendingEmail} = useSelector(state => state.authState.auth)

    const submitEvent = async (e: FormEvent) => {
        e.preventDefault()
        email.length && dispatch(postForgotPassword(email))
    }
    if (sendingEmail) {
        return (
            <Redirect
                to={{
                    pathname: '/reset-password'
                }}
            />
        );
    }

    return (
        <div>
            <form className={'form'} onSubmit={submitEvent}>
                <div className={`text text_type_main-medium mb-6`}>Восстановление пароля</div>
                <div className={`formInput mb-6`}>
                    <Input
                        type={'email'}
                        placeholder={'Укажите e-mail'}
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        name={'email'}
                        error={false}
                        size={'default'}
                    />
                </div>
                <Button type="primary" size="medium">
                    Восстановить
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

export default ForgotPassword;