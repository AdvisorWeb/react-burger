import React  from 'react';
import ReactDOM from 'react-dom'

import ModalOverlay from "../ModalOverlay/ModalOverlay";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {modalRoot} from '../../utils/consts'

import styles from './styles.module.css'

function Modal({name = false, onClick, children}) {

    const stopPropagation  = (e) => {
        e.stopPropagation()
    }

    return ReactDOM.createPortal(
        <ModalOverlay onClick={onClick}>
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
        </ModalOverlay>
        ,
        modalRoot
    );
}

export default Modal;