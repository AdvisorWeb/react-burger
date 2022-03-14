import React from 'react';
import {useDrag} from "react-dnd";

import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import {productProp} from '../../utils/variablePropType.js'

import styles from './style.module.css'
import PropTypes from "prop-types";

const CardIngredient = ({card, onClick}) => {
    const [{ opacity }, dragRef] = useDrag({
        type: 'items',
        item: { card },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        }),
    });

    return (
        <div
            ref={dragRef}
            style={{ opacity }}
            className={`${styles.item} mb-8`}
            onClick={()=> onClick(card)}>

            {card.count !== 0 && <Counter count={card.count} size="default"/>}
            <div className={`${styles.img} pb-1 pl-4 pr-4`}>
                <img src={card.image} alt=""/>
            </div>
            <div className={`${styles.price} pb-1`}>
                <span className={'pr-2 text text_type_digits-default'}>{card.price}</span>
                <CurrencyIcon type="primary"/>
            </div>
            <div className={styles.name}> {card.name} </div>
        </div>
    );
}

CardIngredient.propTypes = {
    card: productProp.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default CardIngredient;