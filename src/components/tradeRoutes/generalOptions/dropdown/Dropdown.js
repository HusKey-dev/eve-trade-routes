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
            animateUnmount: false,
            animateMount: true,
            data: [],
            system: "",
        };
        this.container = React.createRef();
    }

    componentDidMount() {
        // const container = document.querySelector()

        if (sessionStorage.getItem(`Dropdown ${this.props.id}`)) {
            this.setState(
                JSON.parse(sessionStorage.getItem(`Dropdown ${this.props.id}`))
            );
        }
    }

    componentDidUpdate() {
        if (!this.state.animateMount) {
            this.container.current?.classList.remove("appear-dropdown");
        }
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

    handleAnimationEnd = (e) => {
        console.log("animation ended!!!!");
        console.log(e);
        if (this.container.current && this.state.animateUnmount) {
            this.setState({
                ...this.state,
                isActive: false,
                animateUnmount: false,
                animateMount: true,
            });
        } else if (
            this.container.current &&
            this.state.animateMount &&
            e.animationName === "appear-dropdown"
        ) {
            this.container.current.classList.remove("appear-dropdown");
            this.setState({ ...this.state, animateMount: false });
        }
    };
    renderList = () => {
        if (!this.state.isActive) {
            return null;
        } else if (this.state.animateUnmount) {
            this.container.current.classList.add("close-animation");
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
                    <label className="label_check-box">
                        <input
                            type="checkbox"
                            name={system.id}
                            checked={this.state.data.includes(+system.id)}
                            onChange={onChangeHandler}
                            className="check-box"
                        />
                        <div className="custom-box">
                            <i className="fas fa-check check-mark"></i>
                        </div>
                        {` ${system.name}`}
                    </label>
                </React.Fragment>
            ));
        };

        return (
            <div
                id={this.props.id}
                className="Dropdown appear-dropdown"
                onAnimationEnd={this.handleAnimationEnd}
                ref={this.container}
            >
                <div>
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
                        if (!this.state.isActive) {
                            this.setState({
                                ...this.state,
                                isActive: true,
                            });
                        } else {
                            this.setState({
                                ...this.state,
                                animateUnmount: true,
                            });
                        }
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
