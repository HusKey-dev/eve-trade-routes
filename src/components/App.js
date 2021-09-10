import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Header from './header/Header';
import Main from './main/Main';
import JitaPrice from './jitaPrice/JitaPrice';
import TradeRoutes from './tradeRoutes/TradeRoutes';
import Contacts from './contacts/Contacts';
import Footer from './footer/Footer';

function App() {
    return (
        <div className="appWrapper">
            <Router>
                <Header />
                <Route exact path="/" component={Main} />
                <Route exact path="/price" component={JitaPrice} />
                <Route exact path="/routes" component={TradeRoutes} />
                <Route exact path="/contacts" component={Contacts} />
                <Footer text="2021, All rights reserved" />
            </Router>
        </div>
    )
};

export default App;
