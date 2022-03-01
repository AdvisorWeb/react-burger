import React from 'react';

import styles from "./styles.module.css";

function IngredientDetails({cardSelected}) {
    return (
        <div className={`${styles.modalWrp} pl-15 pr-15`} key={`${cardSelected.id}-1`}>
            <div className={` pl-5 pr-5 pb-4`}>
                <img src={cardSelected.image} className={`${styles.modalImg}`} alt=""/>
            </div>

            <div className={`${styles.modalName} pb-8 text text_type_main-medium`}>
                {cardSelected.name}
            </div>
            <ul className={styles.modalTypes}>
                <li className={`${styles.modalLi}`}>
                    <span
                        className={`${styles.modalType} text text_type_main-default`}> Калории,ккал </span>
                    <span
                        className={`${styles.modalValue} text text_type_digits-default`}>{cardSelected.calories}</span>
                </li>
                <li className={`${styles.modalLi}`}>
                    <span className={`${styles.modalType} text text_type_main-default`}> Белки, г</span>
                    <span
                        className={`${styles.modalValue} text text_type_digits-default`}>{cardSelected.proteins}</span>
                </li>
                <li className={`${styles.modalLi}`}>
                    <span className={`${styles.modalType} text text_type_main-default`}> Жиры, г </span>
                    <span
                        className={`${styles.modalValue} text text_type_digits-default`}>{cardSelected.fat}</span>
                </li>
                <li>
                    <span
                        className={`${styles.modalType} text text_type_main-default`}> Углеводы, г </span>
                    <span
                        className={`${styles.modalValue} text text_type_digits-default`}>{cardSelected.carbohydrates}</span>
                </li>
            </ul>
        </div>
    );
}

export default IngredientDetails;