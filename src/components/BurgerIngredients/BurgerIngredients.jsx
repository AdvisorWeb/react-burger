import React, {useEffect, useState} from 'react';

import CardIngredient from '../CardIngredient/CardIngredient'
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

import {Scrollbar} from 'smooth-scrollbar-react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import {categoryProp} from '../../utils/variablePropType.js'

import styles from './styles.module.css'

function BurgerIngredients({category, initScroll}) {
    const [current, setCurrent] = React.useState(category[0].type)
    const scrollContainer = React.useRef(null);
    const [isPopup, setIsPopup] = useState(false)
    const [cardSelected, setCardSelected] = useState(null)

    const togglePopup = (card) => {
        card && setCardSelected(card)
        setIsPopup(!isPopup)
        window.addEventListener('keydown', (event) => {
            const key = event.keyCode
            key === 27 && setIsPopup(false)
        });
    }

    useEffect(() => {
        initScroll(scrollContainer.current)
    });

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
                                active={current === item.type}
                                onClick={setCurrent}
                            >
                                {item.typeName}
                            </Tab>
                        )
                    }
                </div>
                <div className={`${styles.list} scrollContainer`} ref={scrollContainer}>
                    <Scrollbar
                        style={{height: '100%'}}
                        className={'pr-2 pl-2'}
                        plugins={{
                            overscroll: {
                                effect: 'bounce',
                            },
                        }}>
                        {
                            category.map((item) =>
                                <div
                                    key={`${item.type}-${item.typeName}`}
                                    style={{width: '100%'}}
                                    className={`${styles.categories} pb-2`}
                                    data-anchor={item.type}
                                >
                                    <h3
                                        className={`${styles.categoryTitle} text text_type_main-medium mb-6`}
                                        key={item.typeName}
                                        style={{width: '100%'}}
                                    >
                                        {item.typeName}
                                    </h3>
                                    {
                                        item.ingredients.map((card) =>
                                            <CardIngredient
                                                card={card}
                                                key={card._id}
                                                cardSelected={cardSelected}
                                                onClick={togglePopup}/>
                                        )
                                    }
                                </div>
                            )
                        }
                    </Scrollbar>
                </div>
            </div>
            {
                isPopup && cardSelected &&
                <Modal name={'Детали ингредиента'} onClick={togglePopup} >
                    <IngredientDetails cardSelected={cardSelected}/>
                </Modal>
            }
        </>
    );
}

BurgerIngredients.propTypes = {
    initScroll: PropTypes.func.isRequired,
    category: categoryProp.isRequired
};

export default BurgerIngredients;