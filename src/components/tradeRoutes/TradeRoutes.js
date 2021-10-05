import React, { useState, useRef } from "react";

import GeneralOptions from "./generalOptions/GeneralOptions";
import ShipOptions from "./shipOptions/ShipOptions";
import CharacterOptions from "./characterOptions/CharacterOptions";
import ResultList from "./resultList/ResultList";

import "./TradeRoutes.scss";

function TradeRoutes() {
    const formGeneralOptions = useRef();

    const onClickHandler = (e) => {
        e.preventDefault();
        formGeneralOptions.current.onSubmitHandler();
        console.log(formGeneralOptions.current);
    };

    return (
        <div className="TradeRoutes">
            <div className="container">
                <div>
                    <GeneralOptions ref={formGeneralOptions} />
                    <ShipOptions />
                    <CharacterOptions />
                    <button onClick={onClickHandler}>Calculate Routes</button>
                </div>
                <ResultList />
            </div>
        </div>
    );
}

export default TradeRoutes;
