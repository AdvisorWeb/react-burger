import React  from 'react';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './styles.module.css'

function Modal({name = false, onClick, children}) {

    const stopPropagation  = (e) => {
        e.stopPropagation()
    }

    return(
        <div
            className={`${styles.modal} pt-10 pr-10 pb-15 pl-10`}
            onClick={stopPropagation}
        >
            {
                name && <div className={`${styles.modalName} text text_type_main-large`}> {name}</div>
            }

            <div className={styles.modalClose} onClick={onClick}>
                <CloseIcon type="primary" />
            </div>

            {children}
        </div>

    );
}

export default Modal;