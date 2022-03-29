import React, {useEffect} from 'react';
import ReactDOM from 'react-dom'

import ModalOverlay from "../ModalOverlay/ModalOverlay";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import PropTypes from 'prop-types'

import styles from './styles.module.css'

const Modal = ({name = false, onClick, children}) => {
    const modalRoot = document.getElementById("react-modals");
    const closePopup = (event) => {
        const key = event.key
        key  === 'Escape' && onClick()
    }
    const stopPropagation = (e) => {
        e.stopPropagation()
    }

    useEffect(
        () => {
            window.addEventListener('keydown', closePopup)
            return () => window.removeEventListener('keydown', closePopup)
        }
    )

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
                    <CloseIcon type="primary"/>
                </div>

                {children}
            </div>
        </ModalOverlay>
        ,
        modalRoot
    );
}

Modal.propTypes = {
    name: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired

};

export default Modal;