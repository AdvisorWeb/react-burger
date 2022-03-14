import React from 'react';
import { useSelector} from "react-redux";

import Loader from "../Loader/Loader";

import styles from "./style.module.css";
import popupImg from "../../images/done.png";

const OrderDetails = () => {
    const order = useSelector(state => state.order)
    const {isLoading, orderFailed, answer} = order

    const content =
        !orderFailed
            ?
                <div>
                    <div
                        className={`${styles.popupNumber}  text text_type_digits-large pb-8`}
                    >
                        {answer.total}
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
            : <p>Произошла ошибка, попробуйте позже</p>
    return (
        <div
            className={`${styles.popupWrp} pt-20 pb-15`}
        >
            {
                isLoading
                    ? <Loader/>
                    :  content
            }
        </div>
    );
}

export default OrderDetails;