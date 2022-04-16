import React from 'react';

import styles from "./style.module.css";

export const Loader = () => {
    return (
        <div className={styles.loaderWrp}>
            <div className={styles.loader}/>
        </div>
    );
}

export default Loader;