import React from 'react';
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";

import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'

import {TItem} from '../../utils/tsTypes'

import styles from './style.module.css'


interface ICard {
    card: TItem
}

const CardIngredient = ({card}: ICard) => {
    const location = useLocation();
    const [{opacity}, dragRef] = useDrag({
        type: 'items',
        item: {card},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        }),
    });

    return (
        <Link
            key={card._id}
            ref={dragRef}
            style={{opacity}}
            className={`${styles.item} mb-8`}
            to={{
                pathname: `/ingredients/${card._id}`,
                state: {background: location},
            }}>
            {card.count !== 0 && <Counter count={card.count} size="default"/>}
            <div className={`${styles.img} pb-1 pl-4 pr-4`}>
                <img src={card.image} alt=""/>
            </div>
            <div className={`${styles.price} pb-1`}>
                <span className={'pr-2 text text_type_digits-default'}>{card.price}</span>
                <CurrencyIcon type="primary"/>
            </div>
            <div className={styles.name}> {card.name} </div>
        </Link>

    );
};

export default CardIngredient;