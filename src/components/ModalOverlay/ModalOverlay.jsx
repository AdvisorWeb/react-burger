import React from 'react';
import ReactDOM from 'react-dom'

import styles from './styles.module.css'


const modalRoot = document.getElementById("react-modals");

function ModalOverlay({children, onClick}) {
    return ReactDOM.createPortal(
        <div
            className={styles.overlay}
            onClick={onClick}
        >{children}</div>,
        modalRoot

    );
}

export default ModalOverlay;