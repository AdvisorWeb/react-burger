import React from 'react';

import AppHeader from "../AppHeader/AppHeader";
import { Home } from "../../pages/index";
import data from '../../utils/data'


function App() {
    return (
        <>
            <AppHeader />
            <main className={'container'}>
                <Home ingredients={data}/>
            </main>
        </>
    );
}

export default App;
