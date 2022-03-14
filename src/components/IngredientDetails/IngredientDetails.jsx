import React from 'react';
import {useSelector} from "react-redux";

import styles from "./styles.module.css";

const IngredientDetails = () => {
    const selectedObject = useSelector(state => state.modal.selectedObject)

    return (
        <div className={`${styles.modalWrp} pl-15 pr-15`} key={`${selectedObject.id}-1`}>
            <div className={` pl-5 pr-5 pb-4`}>
                <img src={selectedObject.image} className={`${styles.modalImg}`} alt=""/>
            </div>
            <div className={`${styles.modalName} pb-8 text text_type_main-medium`}>
                {selectedObject.name}
            </div>
            <ul className={styles.modalTypes}>
                <li className={`${styles.modalLi}`}>
                    <span
                        className={`${styles.modalType} text text_type_main-default`}> Калории,ккал </span>
                    <span
                        className={`${styles.modalValue} text text_type_digits-default`}>{selectedObject.calories}</span>
                </li>
                <li className={`${styles.modalLi}`}>
                    <span className={`${styles.modalType} text text_type_main-default`}> Белки, г</span>
                    <span
                        className={`${styles.modalValue} text text_type_digits-default`}>{selectedObject.proteins}</span>
                </li>
                <li className={`${styles.modalLi}`}>
                    <span className={`${styles.modalType} text text_type_main-default`}> Жиры, г </span>
                    <span
                        className={`${styles.modalValue} text text_type_digits-default`}>{selectedObject.fat}</span>
                </li>
                <li>
                    <span
                        className={`${styles.modalType} text text_type_main-default`}> Углеводы, г </span>
                    <span
                        className={`${styles.modalValue} text text_type_digits-default`}>{selectedObject.carbohydrates}</span>
                </li>
            </ul>
        </div>
    );
}

export default IngredientDetails;