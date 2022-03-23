import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { calculateRoutes } from "../../actions";

import GeneralOptions from "./generalOptions/GeneralOptions";

import ResultList from "./resultList/ResultList";

import "./TradeRoutes.scss";

function TradeRoutes(props) {
    const formGeneralOptions = useRef();

    const onClickHandler = (e) => {
        e.preventDefault();
        formGeneralOptions.current.onSubmitHandler();
        // console.log(formGeneralOptions.current);
        props.calculateRoutes();
    };

    return (
        <>
            <div className="TradeRoutes">
                <div className="container animate-appear">
                    <div>
                        <GeneralOptions ref={formGeneralOptions} />
                        {/* <ShipOptions />
                        <CharacterOptions /> */}
                        <button className="btn" onClick={onClickHandler}>
                            Calculate Routes
                        </button>
                    </div>
                    <ResultList />
                </div>
            </div>
        </>
    );
}

export default connect(null, { calculateRoutes })(TradeRoutes);
