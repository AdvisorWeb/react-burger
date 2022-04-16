import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {useSelector} from "react-redux";

import {Scrollbar} from 'smooth-scrollbar-react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import CardIngredient from '../CardIngredient/CardIngredient'

import {IStore} from "../../utils/tsTypes";
import {initScroll} from '../../utils/consts'

import styles from './styles.module.css'

const BurgerIngredients = () => {
    const [currentTab, setCurrentTab] = React.useState<string | null>(null)
    const scrollContainer = React.useRef(null);
    const {items} = useSelector((store: IStore) => store.info)

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

    const scrollWrapper = useRef<any>(null)

    const tabScrollEvent = (e: any = null) => {
        // @ts-ignore
        const categoryWrapper = [...document.querySelectorAll<HTMLElement>("[data-anchor]")]

        const offsetTopWrapper = scrollWrapper.current && scrollWrapper.current.offset.y + 250
        categoryWrapper.forEach((item) => {
            const offsetTopItem = item.offsetTop
            const offsetBotItem = item.getBoundingClientRect().height + offsetTopItem
            const itemType = item.getAttribute('data-anchor')
            if (offsetTopWrapper > offsetTopItem && offsetBotItem > offsetTopWrapper) {
                setCurrentTab(itemType)
            }
        })
    }

    const tabScrollControl = useCallback(
        (type: string | null) => (): void => {
            const toTab: HTMLElement | null = document.querySelector(`[data-anchor=${type}]`)
            setCurrentTab(type)
            if (toTab && scrollWrapper.current) {
                scrollWrapper.current.scrollTop = toTab.offsetTop
            }

        }, []
    )

    useEffect(() => {
        initScroll(scrollContainer.current, [])
        tabScrollEvent()
        tabScrollControl(currentTab)
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
                    >
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
                                                    // type={item.type}
                                                    card={card}
                                                    key={card._id}
                                                />
                                            )
                                        }
                                    </div>
                                )
                            })
                        }
                    </Scrollbar>
                </div>
            </div>
        </>
    );
}


export default BurgerIngredients;