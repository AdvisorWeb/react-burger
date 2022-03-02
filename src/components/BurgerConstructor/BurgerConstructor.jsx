import React, {useEffect, useState} from 'react';

import {Button, CurrencyIcon, ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {Scrollbar} from 'smooth-scrollbar-react';
import PropTypes from "prop-types";
import {categoryProp} from '../../utils/variablePropType.js'

import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

import styles from './styles.module.css'

function BurgerConstructor({initScroll, category}) {
    const scrollContainer = React.useRef(null);
    const negativeItems = React.useRef([]);
    const [isPopup, setIsPopup] = useState(false)

    const togglePopup = () => {
        setIsPopup(!isPopup)
        window.addEventListener('keydown', (event) => {
            const key = event.keyCode
            key === 27 &&  setIsPopup(false)
        });
    }

    useEffect(() => {
        setTimeout(() => {
            initScroll(scrollContainer.current, negativeItems.current)
        }, 0)
    });
    return (
        <>
            <div className={`${styles.wrp} pt-25`}>
                <div className="pr-4">
                    <div className="pb-4">
                        <ConstructorElement
                            type={'top'}
                            isLocked={true}
                            text={`${category[0].ingredients[0].name} (верх)`}
                            price={category[0].ingredients[0].price}
                            key={category[0].ingredients[0]._id}
                            thumbnail={category[0].ingredients[0].image}
                        />
                    </div>
                    <div
                        ref={scrollContainer}
                        style={{marginRight: '-16px'}}
                    >
                        <Scrollbar
                            style={{height: '100%'}}
                            className={`${styles.centerWrp} pr-2`}
                            plugins={{
                                overscroll: {
                                    effect: 'bounce',
                                },
                            }}>
                            {
                                category[1].ingredients.map(item => {
                                    return (
                                        <div className={styles.constructorElement} key={item._id}>
                                            <div className={styles.drag}>
                                                <DragIcon type="primary"/>
                                            </div>
                                            <ConstructorElement
                                                text={item.name}
                                                price={item.price}
                                                thumbnail={item.image}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </Scrollbar>
                    </div>
                    <div
                        className="pt-4"
                        ref={(ref) => !negativeItems.current.includes(ref) && negativeItems.current.push(ref)}
                    >
                        <ConstructorElement
                            type={'bottom'}
                            isLocked={true}
                            text={`${category[0].ingredients[0].name} (низ)`}
                            price={category[0].ingredients[0].price}
                            key={`${category[0].ingredients[0]._id}-2`}
                            thumbnail={category[0].ingredients[0].image}
                        />
                    </div>
                </div>
                <div
                    className={`${styles.footer} pt-10`}
                    ref={(ref) => !negativeItems.current.includes(ref) && negativeItems.current.push(ref)}
                >
                <span className={`${styles.price} mr-10`}>
                    <span className="pr-2 text text_type_digits-medium">20</span>
                    <CurrencyIcon
                        type={'primary'}
                        className={'icon'}
                    />
                </span>
                    <Button
                        onClick={togglePopup}
                        type="primary"
                        size="large"
                    >Оформить заказ</Button>
                </div>
            </div>
            {
                isPopup &&
                <Modal  onClick={togglePopup} >
                    <OrderDetails />
                </Modal>
            }
        </>
    );
}

BurgerConstructor.propTypes = {
    initScroll: PropTypes.func.isRequired,
    category: categoryProp.isRequired
};

export default BurgerConstructor;