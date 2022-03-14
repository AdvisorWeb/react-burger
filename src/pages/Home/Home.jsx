import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";

import styles from './home.module.css'

function Home() {
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
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients  initScroll={initScroll}/>
                <BurgerConstructor initScroll={initScroll} />
            </DndProvider>
        </div>
    )
}
export default Home;