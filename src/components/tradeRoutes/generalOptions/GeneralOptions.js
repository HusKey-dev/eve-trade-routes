import React, { Component } from "react";
import { connect } from "react-redux";
import Dropdown from "./dropdown/Dropdown";
import { validateGeneralOptions, updateParams } from "../../../actions";

import "./GeneralOptions.scss";
import { RangeInput } from "./RangeInput/RangeInput";
import NumberInput from "./numberinput/NumberInput";

class GeneralOptions extends Component {
    constructor(props) {
        super(props);
        this.defaultValues = {
            maxRange: 999,
            maxCargo: 581250,
            maxWallet: 999999999999,
        };
        this.state = {
            maxRange: this.defaultValues.maxRange,
            maxCargo: this.defaultValues.maxCargo,
            maxWallet: this.defaultValues.maxWallet,
            secFilter: 0,
            isValid: null,
        };
    }

    componentDidMount() {
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
    handleNumberInputChange = (value, id) => {
        if (isNaN(+value)) {
            this.setState(this.state);
        } else {
            this.setState({ ...this.state, [id]: +value });
        }
    };
    handleNumberInputBlur = (value, id) => {
        if (value === 0) {
            this.setState({ ...this.state, [id]: 1 });
        } else if (this.defaultValues[id] && value >= this.defaultValues[id]) {
            this.setState({ ...this.state, [id]: this.defaultValues[id] });
        }
    };
    render() {
        return (
            <form onSubmit={this.onSubmitHandler} className="GeneralOptions">
                <div className="form-margin form-margin__no-wrap">
                    <label htmlFor="startingSelect">Start Point:</label>
                    <Dropdown key="startingSelect" id="startingSelect" />
                </div>
                <div className="form-margin form-margin__no-wrap">
                    <label htmlFor="endingSelect">End Point:</label>
                    <Dropdown key="endingSelect" id="endingSelect" />
                </div>
                <div className="form-margin">
                    <label>
                        Max Range (jumps):
                        <NumberInput
                            id="maxRange"
                            size={3}
                            value={this.state.maxRange}
                            onNumberInputChange={this.handleNumberInputChange}
                            onNumberInputBlur={this.handleNumberInputBlur}
                        />
                    </label>
                </div>
                <div className="form-margin">
                    <label>
                        Max Cargo Volume:
                        <NumberInput
                            id="maxCargo"
                            size={6}
                            value={this.state.maxCargo}
                            onNumberInputChange={this.handleNumberInputChange}
                            onNumberInputBlur={this.handleNumberInputBlur}
                        />
                    </label>
                </div>
                <div className="form-margin">
                    <label>
                        Max Wallet:
                        <NumberInput
                            id="maxWallet"
                            size={12}
                            value={this.state.maxWallet}
                            onNumberInputChange={this.handleNumberInputChange}
                            onNumberInputBlur={this.handleNumberInputBlur}
                        />
                    </label>
                </div>

                <div className="form-margin">
                    <span>Security Filter:</span>
                    <RangeInput
                        value={this.state.secFilter}
                        min={0}
                        max={1}
                        step={0.5}
                        onInputchange={this.handleInputChange}
                        width={250}
                        options={{
                            0: { color: "red", legend: "null" },
                            0.5: { color: "orange", legend: "low" },
                            1: { color: "hsl(145, 100%, 50%)", legend: "high" },
                        }}
                    />
                </div>
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
