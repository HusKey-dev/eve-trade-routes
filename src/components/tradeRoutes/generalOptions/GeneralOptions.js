import React, { Component } from "react";
import { connect } from "react-redux";
import Dropdown from "./dropdown/Dropdown";
import { validateGeneralOptions, updateParams } from "../../../actions";

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
            this.setState({ ...this.state, [e.target.id]: 99999999 });
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
    render() {
        return (
            <form onSubmit={this.onSubmitHandler}>
                <div className="form-margin">
                    <label htmlFor="startingSelect">Select Start Point:</label>
                    <Dropdown key="startingSelect" id="startingSelect" />
                </div>
                <div className="form-margin">
                    <label htmlFor="endingSelect">Select End Point:</label>
                    <Dropdown key="endingSelect" id="endingSelect" />
                </div>
                <label htmlFor="maxRange">Choose Max Range (jumps):</label>
                <input
                    type="number"
                    id="maxRange"
                    onInput={this.onChangeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.maxRange?.toString()}
                />
                <br />
                <label htmlFor="maxCargo">Max Cargo Volume:</label>
                <input
                    type="number"
                    id="maxCargo"
                    onChange={this.onChangeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.maxCargo.toString()}
                />
                <br />
                <label htmlFor="maxWallet">Max Wallet:</label>
                <input
                    type="number"
                    id="maxWallet"
                    onChange={this.onChangeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.maxWallet?.toString()}
                />
                <br />
                <label htmlFor="secFilter">Security Filter:</label>
                <input
                    type="range"
                    name=""
                    id="secFilter"
                    min="0"
                    max="1"
                    step="0.5"
                    onChange={this.onChangeHandler}
                    value={this.state.secFilter?.toString()}
                />
                <br />
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
