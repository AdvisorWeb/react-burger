import React from 'react';

import styles from "./style.module.css";
import popupImg from "../../images/done.png";

const OrderDetails = () => {
    return (
        <div
            className={`${styles.popupWrp} pt-20 pb-15`}
        >
            <div
                className={`${styles.popupNumber}  text text_type_digits-large pb-8`}
            >
                034536
            </div>
            <span
                className={'text text_type_main-medium'}
            >идентификатор заказа</span>
            <div
                className={`${styles.popupImg} pb-15 pt-15`}
            >
                <img src={popupImg} alt={'Картика все ок'}/>
            </div>
            <span
                className={`${styles.popupText} pb-2 text text_type_main-default`}
            >Ваш заказ начали готовить</span>
            <span
                className={`${styles.popupText} text text_type_main-default text_color_inactive`}
            >Дождитесь готовности на орбитальной станции</span>
        </div>
    );
}

export default OrderDetails;