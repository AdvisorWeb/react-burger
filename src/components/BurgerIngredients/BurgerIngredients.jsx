import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import CardIngredient from '../CardIngredient/CardIngredient'
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

import {initScroll} from '../../utils/consts'

import {Scrollbar} from 'smooth-scrollbar-react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'

import {ADD_OBJ_MODAL, REMOVE_OBJ_MODAL} from '../../services/actions/modalAction'

import styles from './styles.module.css'

const BurgerIngredients = () => {
    const dispatch = useDispatch()

    const [currentTab, setCurrentTab] = React.useState(null)
    const [isPopup, setIsPopup] = useState(false)

    const scrollContainer = React.useRef(null);

    const {items} = useSelector(store => store.info)

    const category = useMemo(
        () => {
            return [
                {
                    type: "bun",
                    typeName: 'Булки',
                    items: items.filter(item => item.type === "bun")
                },
                {
                    type: "main",
                    typeName: 'Начинки',
                    items: items.filter(item => item.type === "main")
                },
                {
                    type: "sauce",
                    typeName: 'Соусы',
                    items: items.filter(item => item.type === "sauce")
                }
            ]
        }, [items]
    )
    const togglePopup = (card) => {
        card && dispatch({type: ADD_OBJ_MODAL, card})
        isPopup && dispatch({type: REMOVE_OBJ_MODAL})
        setIsPopup(!isPopup)
    }

    const scrollWrapper = useRef(null)

    const tabScrollEvent = () => {
        const categoryWrapper = [...document.querySelectorAll('[data-anchor]')]
        const offsetTopWrapper = scrollWrapper.current.offset.y + 250
        categoryWrapper.forEach(item => {
            const offsetTopItem = item.offsetTop
            const offsetBotItem = item.getBoundingClientRect().height + offsetTopItem
            const itemType = item.getAttribute('data-anchor')
            if (offsetTopWrapper > offsetTopItem && offsetBotItem > offsetTopWrapper) {
                setCurrentTab(itemType)
            }
        })
    }

    const tabScrollControl = useCallback(
        (type) =>() =>{
            setCurrentTab(type)
            scrollWrapper.current.scrollTop = document.querySelector(`[data-anchor=${type}]`).offsetTop
        },[]
    )

    useEffect(() => {
        initScroll(scrollContainer.current)
        tabScrollEvent()
        tabScrollControl()
    }, [tabScrollControl, initScroll]);

    return (
        <>
            <div className={styles.wrp}>
                <h1
                    className={`${styles.title} mt-10 mb-5 text text_type_main-large`}
                >Соберите бургер</h1>
                <div className={`${styles.tabs} mb-10`}>
                    {
                        category.map((item, index) =>
                            <Tab
                                key={`${item.type}-${index}`}
                                value={item.type}
                                active={currentTab === item.type}
                                onClick={tabScrollControl(item.type)}
                            >
                                {item.typeName}
                            </Tab>
                        )
                    }
                </div>
                <div className={`${styles.list} scrollContainer`} ref={scrollContainer}>
                    <Scrollbar
                        className={`${styles.h100} pr-2 pl-2`}
                        onScroll={(e) => tabScrollEvent(e)}
                        ref={scrollWrapper}
                        plugins={{
                            overscroll: {
                                effect: 'bounce',
                            },
                        }}>
                        {
                            category.map(item => {
                                return (
                                    <div
                                        className={`${styles.categories} pb-2`}
                                        data-anchor={item.type}
                                        key={`${item.type}-${item.typeName}`}
                                    >

                                        <h3
                                            className={`${styles.categoryTitle} text text_type_main-medium mb-6`}
                                        >
                                            {item.typeName}
                                        </h3>
                                        {
                                            item.items.map((card) =>
                                                <CardIngredient
                                                    type={item.type}
                                                    card={card}
                                                    key={card._id}
                                                    onClick={togglePopup}/>
                                            )
                                        }
                                    </div>
                                )
                            })
                        }
                    </Scrollbar>
                </div>
            </div>
            {
                isPopup &&
                <Modal name={'Детали ингредиента'} onClick={togglePopup} setIsPopup={setIsPopup}>
                    <IngredientDetails/>
                </Modal>
            }
        </>
    );
}

export default BurgerIngredients;