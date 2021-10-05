import React, { Component } from "react";
import { connect } from "react-redux";
import Dropdown from "./dropdown/Dropdown";

class GeneralOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startPoint: null,
            endPoint: null,
            maxRange: 999,
            maxCargo: 581250,
            maxWallet: 9999999999999,
            secFilter: 0,
        };
    }

    componentDidMount() {
        this.setState(JSON.parse(sessionStorage.getItem("GeneralOptions")));
    }

    componentDidUpdate() {
        console.log(this.props);
    }

    componentWillUnmount() {
        sessionStorage.setItem("GeneralOptions", JSON.stringify(this.state));
    }

    onSubmitHandler = (e) => {
        e?.preventDefault();
        console.log("General Options submitted");
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

    render() {
        return (
            <form onSubmit={this.onSubmitHandler}>
                <label htmlFor="startingSelect">Select Start Point:</label>
                <Dropdown key="startingSelect" id="startingSelect" />
                <br />
                <label htmlFor="endingSelect">Select End Point:</label>
                <Dropdown key="endingSelect" id="endingSelect" />
                <br />
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

const mapStateToProps = (state) => {
    return {
        startingOptions: state.placeParams.startingOptions,
        endingOptions: state.placeParams.endingOptions,
    };
};
export default connect(mapStateToProps, null, null, { forwardRef: true })(
    GeneralOptions
);
