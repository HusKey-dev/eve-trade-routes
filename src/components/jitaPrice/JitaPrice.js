import React, { useState } from "react";
import { connect } from "react-redux";
import checkPrice from "../../actions/checkPrice";

import PriceResult from "./priceResult/PriceResult";

import "./JitaPrice.scss";

function JitaPrice(props) {
    const [userInput, setUserInput] = useState("");
    const [isSearched, setIsSearched] = useState(false);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setUserInput(userInput.trim());
        if (!userInput.trim()) {
            setIsSearched(false);
        } else {
            setIsSearched(true);
            props.checkPrice(userInput);
        }
    };

    return (
        <div className="JitaPrice">
            <div className="container animate-appear">
                <form onSubmit={onSubmitHandler}>
                    <label>
                        Copypaste The Item Name Here:
                        <input
                            type="text"
                            placeholder="Item Name"
                            value={userInput}
                            onChange={(e) => {
                                setUserInput(e.target.value);
                            }}
                            className="text-input"
                        ></input>
                    </label>
                    <button type="submit" className="btn">
                        Check The Price
                    </button>
                    <PriceResult
                        shouldRender={!!(isSearched && props.price)}
                        orders={{
                            buy: props.price?.buy,
                            sell: props.price?.sell,
                        }}
                    ></PriceResult>
                </form>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({ price: state.jitaPrice });
export default connect(mapStateToProps, { checkPrice })(JitaPrice);
