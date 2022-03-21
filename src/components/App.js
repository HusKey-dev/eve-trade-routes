import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import Header from "./header/Header";
import Main from "./main/Main";
import JitaPrice from "./jitaPrice/JitaPrice";
import TradeRoutes from "./tradeRoutes/TradeRoutes";
import Contacts from "./contacts/Contacts";
import Footer from "./footer/Footer";
import Modal from "./modal/Modal";
import SearchingModal from "./SearchingModal/SearchingModal";
import ErrorModal from "./ErrorModal/ErrorModal";

import "./App.scss";

function App() {
    return (
        <div className="appWrapper">
            <Router>
                <Header />
                <div className="main-area">
                    <Route exact path="/" component={Main} />
                    <Route exact path="/price" component={JitaPrice} />
                    <Route exact path="/routes" component={TradeRoutes} />
                    <Route exact path="/contacts" component={Contacts} />
                </div>
                <Footer text="2022, All rights reserved" />
            </Router>
            <Modal></Modal>
        </div>
    );
}

export default App;
