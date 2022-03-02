import React from 'react';

import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";

import PropTypes from 'prop-types'
import {productProp} from '../../utils/variablePropType.js'

import styles from './home.module.css'

function Home({ingredients}) {
    const initScroll = (scrollContainer, negativeItems = false) => {
        setTimeout(() => {
            if (scrollContainer) {
                const scrollContainerTop = scrollContainer.getBoundingClientRect().top || 0;
                let negativeScrollHeight = 0
                negativeItems && negativeItems.forEach(item => negativeScrollHeight += item && item.getBoundingClientRect().height)
                const maxHeight = window.innerHeight - scrollContainerTop - 40 - negativeScrollHeight
                scrollContainer.style.height = `${maxHeight}px`
            }
        }, 0)
    }
    const typeTranslate = (type) => {
        if (type === 'bun') {
            return 'Булка'
        } else if (type === 'sauce') {
            return 'Соус'
        } else if (type === 'main') {
            return 'Начинки'
        }
    }
    const categoryType = [...new Set(ingredients.map(item => item.type))].map(item => {
        return {
            type: item,
            typeName: typeTranslate(item),
            ingredients: ingredients.filter(a => a.type === item)
        }
    })

    return (
        <div className={`${styles.home} pb-10`}>
            <BurgerIngredients category={categoryType} initScroll={initScroll}/>
            <BurgerConstructor initScroll={initScroll} category={categoryType}/>
        </div>
    )
}

Home.propTypes = {
    ingredients: PropTypes.arrayOf(productProp).isRequired
};

export default Home;