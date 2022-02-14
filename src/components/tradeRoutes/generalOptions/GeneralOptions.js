import React, { Component } from "react";
import { connect } from "react-redux";
import Dropdown from "./dropdown/Dropdown";
import { validateGeneralOptions, updateParams } from "../../../actions";

import "./GeneralOptions.scss";
import { RangeInput } from "./RangeInput/RangeInput";

class GeneralOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxRange: 999,
            maxCargo: 581250,
            maxWallet: 9999999999999,
            secFilter: 0,
            isValid: null,
        };
    }

    componentDidUpdate() {
        console.log(this.state);
    }
    componentDidMount() {
        console.log("mounted with state =", this.state);
        if (sessionStorage.getItem("GeneralOptions")) {
            this.setState(JSON.parse(sessionStorage.getItem("GeneralOptions")));
        }
    }

    componentWillUnmount() {
        sessionStorage.setItem("GeneralOptions", JSON.stringify(this.state));
    }

    onSubmitHandler = (e) => {
        e?.preventDefault();
        this.updateParams();
        // this.props.validateGeneralOptions();
    };

    onChangeHandler = (e) => {
        let input = e.target.value;
        console.log(input);
        if (input === "") this.setState({ ...this.state, [e.target.id]: 0 });
        if (e.target.type === "number") {
            input = parseInt(input);
            if (input < 1) input = 0;
        }
        if (input || input >= 0) {
            this.setState({ ...this.state, [e.target.id]: input });
        }
    };

    onBlurHandler = (e) => {
        if (e.target.value === "0" && e.target.id === "maxRange") {
            this.setState({ ...this.state, [e.target.id]: 999 });
        }
        if (
            (e.target.value === "0" || +e.target.value > 581250) &&
            e.target.id === "maxCargo"
        ) {
            this.setState({ ...this.state, [e.target.id]: 581250 });
        }
    };

    validateForm = () => {
        this.props.validateGeneralOptions();
    };

    updateParams = () => {
        const params = {
            maxRange: this.state.maxRange,
            maxCargo: this.state.maxCargo,
            maxWallet: this.state.maxWallet,
            secFilter: this.state.secFilter,
        };
        this.props.updateParams(params);
    };

    handleInputChange = (value) => {
        this.setState({ ...this.state, secFilter: +value });
    };
    render() {
        return (
            <form onSubmit={this.onSubmitHandler} className="GeneralOptions">
                <div className="form-margin">
                    <label htmlFor="startingSelect">Select Start Point:</label>
                    <Dropdown key="startingSelect" id="startingSelect" />
                </div>
                <div className="form-margin">
                    <label htmlFor="endingSelect">Select End Point:</label>
                    <Dropdown key="endingSelect" id="endingSelect" />
                </div>
                <div className="form-margin">
                    <label htmlFor="maxRange">Choose Max Range (jumps):</label>
                    <input
                        maxLength="3"
                        type="number"
                        id="maxRange"
                        onInput={this.onChangeHandler}
                        onBlur={this.onBlurHandler}
                        value={this.state.maxRange?.toString()}
                        className="number-input"
                    />
                </div>
                <div className="form-margin">
                    <label htmlFor="maxCargo">Max Cargo Volume:</label>
                    <input
                        type="number"
                        id="maxCargo"
                        onChange={this.onChangeHandler}
                        onBlur={this.onBlurHandler}
                        value={this.state.maxCargo.toString()}
                        className="number-input"
                    />
                </div>
                <div className="form-margin">
                    <label htmlFor="maxWallet">Max Wallet:</label>
                    <input
                        type="number"
                        id="maxWallet"
                        onChange={this.onChangeHandler}
                        onBlur={this.onBlurHandler}
                        value={this.state.maxWallet?.toString()}
                        className="number-input"
                    />
                </div>
                <div className="form-margin">
                    <span>Security Filter:</span>
                    <RangeInput
                        value={this.state.secFilter}
                        min={0}
                        max={1}
                        step={0.5}
                        onInputchange={this.handleInputChange}
                        width={300}
                        options={{
                            0: { color: "red", legend: "null" },
                            0.5: { color: "orange", legend: "low" },
                            1: { color: "hsl(145, 100%, 50%)", legend: "high" },
                        }}
                    />
                </div>
                <button type="submit" disabled>
                    submit
                </button>
            </form>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         startingOptions: state.placeParams.startingOptions,
//         endingOptions: state.placeParams.endingOptions,
//     };
// };
export default connect(null, { validateGeneralOptions, updateParams }, null, {
    forwardRef: true,
})(GeneralOptions);
