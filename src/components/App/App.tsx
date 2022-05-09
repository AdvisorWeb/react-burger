import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {BrowserRouter as Router, Switch, Route, useHistory, useLocation} from "react-router-dom";

import AppHeader from "../AppHeader/AppHeader";
import {ProtectedRoute} from '../ProtectedRoute/ProtectedRoute'
import {Loader} from '../Loader/Loader'
import Modal from "../Modal/Modal";
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import {Home, Login, ForgotPassword, Page404, Profile, Register, ResetPassword} from "../../pages";

import {getItems} from '../../services/actions/mainInfoAction'
import {refreshToken} from '../../services/actions/authAction'

import {IStore} from "../../utils/tsTypes";

import styles from './style.module.css'
import Feed from "../../pages/Feed/Feed";
import OrderInfo from "../OrderInfo/OrderInfo";
import History from "../../pages/History/History";

type TLocation = {
    state: {
        background: any
    }
}

const App = () => {
    const dispatch = useDispatch()
    const location: TLocation = useLocation();
    const history = useHistory();
    const background = location.state && location.state.background;
    const {isLoading, itemsFailed} = useSelector((store: IStore) => store.info)

    const { authorizationCheck} = useSelector((store: IStore) => store.authState)

    const closePopup = (): void => {
        history.goBack();
    };

    useEffect(
        ()=> {
            dispatch(refreshToken())
        },[]
    )

    useEffect(
        () => {
            dispatch(getItems())
        }, [dispatch, authorizationCheck]
    )
    return (
        !authorizationCheck
            ? <Loader/>
            :  <>
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

                        <Route path='/ingredients/:ingredientId' exact>
                            <IngredientDetails inPage={true}/>
                        </Route>

                        <Route
                            path="/profile/"
                            exact={true}
                        >
                            <Profile/>
                        </Route>
                        <Route path="/profile/orders/" exact={true}>
                            <History/>
                        </Route>
                        <Route path='/profile/orders/:id' exact>
                            <OrderInfo inPage={true}/>
                        </Route>
                        <Route path='/feed/' exact>
                            <Feed/>
                        </Route>

                        <Route path='/feed/:id' exact>
                            <OrderInfo inPage={true}/>
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
                    {background && (
                        <Route
                            path='/feed/:id'
                            children={
                                <Modal onClick={closePopup}>
                                    <OrderInfo inPage={false}/>
                                </Modal>
                            }
                        />
                    )}
                    {background && (
                        <Route
                            path='/profile/orders/:id'
                            children={
                                <Modal onClick={closePopup}>
                                    <OrderInfo inPage={false}/>
                                </Modal>
                            }
                        />
                    )}


                </main>
            </>


    );
}

export default App;
