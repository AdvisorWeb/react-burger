import React from 'react';

import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import {objProp} from '../../utils/variablePropType.js'

import styles from './style.module.css'

function CardIngredient({card}) {
    return (
        <div className={`${styles.item} mb-8`}>
            {card.__v !== 0 && <Counter count={card.__v} size="default"/>}
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
    card: objProp.isRequired
};

export default CardIngredient;