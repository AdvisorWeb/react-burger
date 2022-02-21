import React from 'react';

import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import PropTypes from 'prop-types'
import {objProp} from '../../utils/variablePropType.js'

import styles from './home.module.css'

function Home({ingredients}) {
    let category = []
    new Set(ingredients.map(item => item.type)).forEach((type) => {
        let obj;
        switch (true) {
            case type === 'bun' :
                obj = {
                    type,
                    typeName: 'Булка',
                    categoryOrder: 1,
                    ingredient: ingredients.filter(item => item.type === type)
                }
                break;
            case type === "sauce" :
                obj = {
                    type,
                    typeName: 'Соусы',
                    categoryOrder: 2,
                    ingredient: ingredients.filter(item => item.type === type)
                }
                break
            case type === 'main' :
                obj = {
                    type,
                    typeName: 'Основа',
                    categoryOrder: 3,
                    ingredient: ingredients.filter(item => item.type === type)
                }
                break
            default :
                return false
        }
        category[obj.categoryOrder - 1] = obj
    })

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
    return (
        <div className={`${styles.home} pb-10`}>
            <BurgerIngredients category={category} initScroll={initScroll}/>
            <BurgerConstructor initScroll={initScroll} category={category}/>
        </div>
    );
}

Home.propTypes = {
    ingredients: PropTypes.arrayOf(objProp).isRequired
};

export default Home;