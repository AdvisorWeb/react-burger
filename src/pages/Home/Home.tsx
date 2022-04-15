import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";

import styles from './home.module.css'

const Home = () => {
    return (
        <div className={`${styles.home} pb-10`}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
            </DndProvider>
        </div>
    )
}
export default Home;