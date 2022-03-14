import React from 'react';
import PropTypes from 'prop-types'

import styles from './styles.module.css'

function ModalOverlay({children, onClick}) {
    return (
        <div
            className={styles.overlay}
            onClick={onClick}
        >{children}</div>
    );
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
};

export default ModalOverlay;