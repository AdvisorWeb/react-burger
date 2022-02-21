import React, {useEffect} from 'react';

import CardIngredient from '../CardIngredient/CardIngredient'
import {Scrollbar} from 'smooth-scrollbar-react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import {categoryProp} from '../../utils/variablePropType.js'

import styles from './styles.module.css'

function BurgerIngredients({category, initScroll}) {
    const [current, setCurrent] = React.useState(category[0].type)
    const scrollContainer = React.useRef(null);

    useEffect(() => {
        initScroll(scrollContainer.current)
    });

    return (
        <div className={styles.wrp}>
            <h1 className={`${styles.title} mt-10 mb-5 text text_type_main-large`}>Соберите бургер</h1>
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
                        category.map(item =>
                            <div
                                key={item.type}
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
                                    item.ingredient.map(card => <CardIngredient card={card} key={card._id}/>)
                                }
                            </div>
                        )
                    }
                </Scrollbar>
            </div>
        </div>
    );
}

BurgerIngredients.propTypes = {
    initScroll: PropTypes.func,
    category: categoryProp.isRequired
};

export default BurgerIngredients;