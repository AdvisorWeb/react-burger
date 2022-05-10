import React, {useEffect, useMemo, useState, useRef, FormEvent, MouseEvent} from 'react';
import {useDispatch, useSelector} from "../../services/store";
import {useDrop} from 'react-dnd';
import {Redirect} from 'react-router-dom'

import {Button, CurrencyIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components'
import {Scrollbar} from 'smooth-scrollbar-react';
import BurgerConstructorDraggable from '../BurgerConstructorDraggable/BurgerConstructorDraggable'
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

import {MOVE_ITEM, REMOVE_ITEM, REFRESH_ITEMS} from '../../services/actions/constant'
import { addItemConstructor} from '../../services/actions/constructorAction'
import {REMOVE_ITEMS_COUNT, REFRESH_ITEMS_COUNT} from '../../services/actions/constant'
import {getOrder} from '../../services/actions/oderAction'

import {initScroll} from '../../utils/consts'
import {TItem} from '../../utils/tsTypes'

import styles from './styles.module.css'


const BurgerConstructor = () => {
    const dispatch = useDispatch()
    const scrollContainer = useRef(null);
    const negativeItems = useRef<(HTMLElement | null)[]>([]);
    const [isPopup, setIsPopup] = useState<boolean>(false)
    const constructorItems = useSelector(state => state.constructorItems)
    const {authorization} = useSelector(state => state.authState)
    const [redirectTo, setRedirectTo] = useState<boolean>(false)

    const [, dropTarget] = useDrop({
        accept: 'items',
        drop({card}: { card: TItem }): void {
            dispatch(addItemConstructor(card))
        },
    });

    const moveCard = (dragIndex: number, hoverIndex: number) => {
        dispatch({type: MOVE_ITEM, hoverIndex, dragIndex})
    };


    const deleteItem = (e: MouseEvent, key: string, id: string) => {

        // @ts-ignore
        const path = e.nativeEvent.path || (e.nativeEvent.composedPath && e.nativeEvent.composedPath());

        const hasDeleteIcon = path.some((item: HTMLElement) => item.classList && item.classList.contains('constructor-element__action'))

        hasDeleteIcon && dispatch({type: REMOVE_ITEM, key, id})
        hasDeleteIcon && dispatch({type: REMOVE_ITEMS_COUNT, id})
    }
    type TPost = {
        order: (string | null)[]
    }
    const submitData = (e: FormEvent) => {
        e.preventDefault()

        const postRequest: TPost = {
            order: basketItemsConcat.map((item) => item && item._id)
        }
        dispatch(getOrder(postRequest))
    }

    const togglePopup = () => {
        if (authorization) {
            setIsPopup(!isPopup)
            isPopup && dispatch({type: REFRESH_ITEMS})
            isPopup && dispatch({type: REFRESH_ITEMS_COUNT})
        } else {
            setRedirectTo(true)
        }
    }

    const basketItemsConcat = useMemo(
        (): (TItem | null)[] => {
            return [...constructorItems.bun, ...constructorItems.bun, ...constructorItems.other]
        }, [constructorItems]
    )
    const totalPrice = useMemo(
        () => {
            return basketItemsConcat.reduce((sum: number, item) =>{
                return item ? sum + item.price : 0
            }, 0)

        }, [basketItemsConcat]
    )

    const emptyBasket = useMemo(
        () => {
            return !constructorItems.bun[0] && !constructorItems.other[0] ? `${styles.emptyBasket}` : ''
        }, [constructorItems]
    )

    const modal = useMemo(
        () => <Modal onClick={togglePopup}><OrderDetails/></Modal>
        , [togglePopup, setIsPopup]
    )

    useEffect(() => {
        setTimeout(() => {
            initScroll(scrollContainer.current, negativeItems.current)
        }, 0)
    })

    if (redirectTo) {
        return <Redirect
            to={{
                pathname: "/login",
            }}
        />
    }

    return (
        <>
            <form className={`${styles.wrp} pt-25`} method="POST" onSubmit={submitData}>
                <div
                    className={`${emptyBasket} pr-4 `}
                    ref={dropTarget}
                >
                    <div className="pb-4">
                        {
                            constructorItems.bun[0] &&
                            <ConstructorElement
                                type={'top'}
                                isLocked={true}
                                text={`${constructorItems.bun[0].name} (верх)`}
                                price={constructorItems.bun[0].price}
                                key={constructorItems.bun[0].key}
                                thumbnail={constructorItems.bun[0].image}
                            />
                        }
                    </div>
                    <div
                        ref={scrollContainer}
                        className={styles.marginMinus}
                    >
                        <Scrollbar
                            className={`${styles.centerWrp} ${styles.h100} pr-2`}
                        >
                            {
                                constructorItems.other[0] &&
                                constructorItems.other.map((item, index) => {
                                    return (
                                        item &&
                                        <BurgerConstructorDraggable
                                            item={item}
                                            index={index}
                                            deleteItem={deleteItem}
                                            key={item.key}
                                            moveCard={moveCard}
                                        />

                                    )
                                })
                            }
                        </Scrollbar>
                    </div>
                    <div
                        className="pt-4"
                        ref={(ref) => !negativeItems.current.includes(ref) && negativeItems.current.push(ref)}
                    >
                        {
                            constructorItems.bun[0] &&
                            <ConstructorElement
                                type={'bottom'}
                                isLocked={true}
                                text={`${constructorItems.bun[0].name} (низ)`}
                                price={constructorItems.bun[0].price}
                                key={constructorItems.bun[0].key}
                                thumbnail={constructorItems.bun[0].image}
                            />
                        }
                    </div>
                </div>
                <div
                    className={`${styles.footer} pt-10`}
                    ref={(ref) => !negativeItems.current.includes(ref) && negativeItems.current.push(ref)}
                >
                <span className={`${styles.price} mr-10`}>
                    <span className="pr-2 text text_type_digits-medium">{totalPrice}</span>
                    <CurrencyIcon
                        type={'primary'}
                        // className={'icon'}
                    />
                </span>
                    <Button
                        onClick={togglePopup}
                        type="primary"
                        size="large"
                        disabled={totalPrice === 0}
                    >Оформить заказ</Button>
                </div>
            </form>
            {
                isPopup && modal
            }
        </>
    );
}


export default BurgerConstructor;