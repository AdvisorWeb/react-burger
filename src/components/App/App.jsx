import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import { BrowserRouter as  Router, Switch, Route, useHistory, useLocation} from "react-router-dom";

import AppHeader from "../AppHeader/AppHeader";
import {ProtectedRoute} from '../ProtectedRoute/ProtectedRoute'
import {Loader} from '../Loader/Loader'
import Modal from "../Modal/Modal";
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import {Home, Login, ForgotPassword, Page404, Profile, Register, ResetPassword} from "../../pages/index";

import {getItems} from '../../services/actions/mainInfoAction'
import {refreshToken} from '../../services/actions/authAction'

import styles from './style.module.css'

const App = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const history = useHistory();
    const background = location.state && location.state.background;
    const {isLoading, itemsFailed} = useSelector(store => store.info)

    const closePopup = () => {
        history.goBack();
    };

    useEffect(
        () => {
            dispatch(getItems())
            dispatch(refreshToken())
        }, [dispatch]
    )

    return (
        <>
            <AppHeader/>
            <main className={'container'}>
                <Switch location={background || location}>
                    <Route path="/" exact={true}>
                        {
                            itemsFailed
                                ? <p className={styles.error}>Произошла ошибка или проблемы с интернетами</p>
                                : !isLoading ? <Home/> : <Loader/>
                        }
                    </Route>
                    <ProtectedRoute path="/login" exact={true} toPath='/'>
                        <Login/>
                    </ProtectedRoute>
                    <ProtectedRoute path="/register" exact={true}>
                        <Register/>
                    </ProtectedRoute>
                    <ProtectedRoute path="/forgot-password" exact={true}>
                        <ForgotPassword/>
                    </ProtectedRoute>
                    <ProtectedRoute path="/reset-password" exact={true}>
                        <ResetPassword/>
                    </ProtectedRoute>
                    {/*<ProtectedRoute path="/profile" exact={true} toPath={'/login'}>*/}
                    {/*    <Profile/>*/}
                    {/*</ProtectedRoute>*/}

                    <Route
                        path="/profile"
                        exact={true}
                    >
                        <Profile/>
                    </Route>
                    <Route path='/ingredients/:ingredientId' exact>
                        <IngredientDetails inPage={true}/>
                    </Route>
                    <Route>
                        <Page404/>
                    </Route>
                </Switch>

                {background && (
                    <Route
                        path='/ingredients/:ingredientId'
                        children={
                            <Modal name={'Детали ингредиента'} onClick={closePopup}>
                                <IngredientDetails inPage={false}/>
                            </Modal>
                        }
                    />
                )}


            </main>
        </>
    );
}

export default App;
