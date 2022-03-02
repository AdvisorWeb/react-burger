import React from 'react';

import styles from './styles.module.css'

function ModalOverlay({children, onClick}) {
    return (
        <div
            className={styles.overlay}
            onClick={onClick}
        >{children}</div>
    );
}

export default ModalOverlay;