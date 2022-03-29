import React from 'react';
import {useDrag} from "react-dnd";

import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'
import {productProp} from '../../utils/variablePropType.js'

import styles from './style.module.css'
import PropTypes from "prop-types";
import {
    Link,
    useLocation,
} from "react-router-dom";
import {useDispatch} from "react-redux";

const CardIngredient = ({card}) => {
    const dispatch = useDispatch()

    const location = useLocation();
    const [{ opacity }, dragRef] = useDrag({
        type: 'items',
        item: { card },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        }),
    });

    return (
        <Link
            key={card._id}
            ref={dragRef}
            style={{ opacity }}
            className={`${styles.item} mb-8`}
            tag={'div'}
            to={{
                pathname: `/ingredients/${card._id}`,
                state: { background: location },
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
}

CardIngredient.propTypes = {
    card: productProp.isRequired,
};

export default CardIngredient;