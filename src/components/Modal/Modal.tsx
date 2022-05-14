import React, {FC, useEffect, MouseEvent} from 'react';
import ReactDOM from 'react-dom'

import ModalOverlay from "../ModalOverlay/ModalOverlay";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './styles.module.css'

interface IModal {
    name?: string
    onClick: () => void
}

const Modal: FC<IModal> = ({name, onClick, children}) => {
    const modalRoot: HTMLElement | null = document.getElementById("react-modals");
    const closePopup = (e: KeyboardEvent) => {
        const key: string = e.key
        key === 'Escape' && onClick()
    }
    const stopPropagation = (e: MouseEvent) => {
        e.stopPropagation()
    }

    useEffect(
        () => {
            window.addEventListener('keydown', closePopup)
            return () => window.removeEventListener('keydown', closePopup)
        }
    )

    return modalRoot && ReactDOM.createPortal(
        <ModalOverlay onClick={onClick}>
            <div
                className={`${styles.modal} pt-10 pr-10 pb-15 pl-10`}
                onClick={stopPropagation}
                data-cy={'popup'}
            >
                {
                    name && <div className={`${styles.modalName} text text_type_main-large`}> {name}</div>
                }

                <div className={styles.modalClose} onClick={onClick}  data-cy={'popup-close'}>
                    <CloseIcon type="primary"/>
                </div>

                {children}
            </div>
        </ModalOverlay>
        ,
        modalRoot
    );
}


export default Modal;