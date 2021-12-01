import React from "react";
import { connect } from "react-redux";

import { saveOptions } from "../../../../actions";
import { empireRegions, outlawRegions, hubs } from "./regions.js";
import "./Dropdown.scss";

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            data: [],
            system: "",
        };
    }

    componentDidMount() {
        if (sessionStorage.getItem(`Dropdown ${this.props.id}`)) {
            this.setState(
                JSON.parse(sessionStorage.getItem(`Dropdown ${this.props.id}`))
            );
        }
    }

    componentDidUpdate() {
        this.props.saveOptions(
            `${this.props.id.toUpperCase()}_OPTIONS`,
            this.state
        );
    }

    componentWillUnmount() {
        console.log("unmount worked");
        console.log(this.props.id, this.state);
        sessionStorage.setItem(
            `Dropdown ${this.props.id}`,
            JSON.stringify(this.state)
        );
    }

    up = () => {
        return <i className="fas fa-chevron-up"></i>;
    };

    down = () => {
        return <i className="fas fa-chevron-down"></i>;
    };

    buttonContent = () => {
        return this.state.isActive ? this.up() : this.down();
    };

    renderList = () => {
        if (!this.state.isActive) {
            return null;
        }

        const onChangeHandler = (e) => {
            console.log(e.target);
            if (e.target.checked) {
                this.setState({
                    ...this.state,
                    data: [...this.state.data, +e.target.name],
                });
            } else {
                this.setState({
                    ...this.state,
                    data: this.state.data.filter(
                        (regionId) => regionId !== +e.target.name
                    ),
                });
            }
        };
        const onsystemChange = (e) => {
            this.setState({ ...this.state, system: e.target.value });
        };
        const renderItems = (array) => {
            return array.map((system) => (
                <React.Fragment key={system.id}>
                    <label>
                        <input
                            type="checkbox"
                            name={system.id}
                            checked={this.state.data.includes(+system.id)}
                            onChange={onChangeHandler}
                        ></input>
                        {` ${system.name}`}
                    </label>
                </React.Fragment>
            ));
        };

        return (
            <div className="Dropdown">
                <div className="columnContainer">
                    <div className="regionColumn">
                        <p>Empire Regions</p>
                        {renderItems(empireRegions)}
                    </div>
                    <div className="regionColumn">
                        <p>Outlaw Regions</p>
                        {renderItems(outlawRegions)}
                    </div>
                    <div className="regionColumn">
                        <p>Hubs</p>
                        {renderItems(hubs)}
                    </div>
                </div>
                <label className="specificSystem">
                    Or Enter Scpecific System Name:
                    <input
                        type="text"
                        value={this.state.system}
                        onChange={onsystemChange}
                    />
                </label>
            </div>
        );
    };

    render() {
        return (
            <>
                <div
                    className={`button ${this.state.isActive ? "active" : ""}`}
                    onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                            ...this.state,
                            isActive: !this.state.isActive,
                        });
                    }}
                >
                    {this.buttonContent()}
                </div>
                {this.renderList(this.state.isActive)}
            </>
        );
    }
}

export default connect(null, { saveOptions })(Dropdown);
