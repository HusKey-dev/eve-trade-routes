import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./ResultList.scss";

export class ResultList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: this.props.routes,
            limit: 20,
        };
    }

    static getDerivedStateFromProps(props, state) {
        return { ...state, routes: props.routes };
    }
    renderItem = (item, index) => {
        return (
            <CSSTransition
                // in={true}
                classNames="card"
                className="card"
                timeout={{ enter: index * 500, exit: 0 }}
                key={item.id}
            >
                <div onClick={() => console.log(this.state)}>
                    <p>
                        from:{" "}
                        <span
                            className={this.colorSecStatus(item.startsystemSec)}
                        >
                            {item.startsystem}
                        </span>
                    </p>
                    <p>
                        to:{" "}
                        <span
                            className={this.colorSecStatus(item.endsystemSec)}
                        >
                            {item.endsystem}
                        </span>
                    </p>
                    <p>
                        jumps: <span className="card__data">{item.jumps}</span>
                    </p>
                    <p>
                        profit:{" "}
                        <span className="card__data">
                            {item.profit} mil isk
                        </span>
                    </p>
                    <p>
                        profit per jump:{" "}
                        <span className="card__data">
                            {item.profitPerJump} mil isk
                        </span>
                    </p>
                    <p>
                        commodity:{" "}
                        <span className="card__data">{item.commodity}</span>
                    </p>
                    <p>
                        quantity:{" "}
                        <span className="card__data">{item.quantity}</span>
                    </p>
                    <p>
                        you buy:{" "}
                        <span className="card__data">{item.buyPrice} isk</span>
                    </p>
                    <p>
                        you sell:{" "}
                        <span className="card__data">{item.sellPrice} isk</span>
                    </p>
                </div>
            </CSSTransition>
        );
    };
    colorSecStatus = (secStatus) => {
        if (secStatus >= 0.5) {
            return "highsec";
        } else if (secStatus <= 0) {
            return "nulsec";
        } else {
            return "lowsec";
        }
    };

    renderNoResult = () => {
        return (
            <CSSTransition
                classNames="card"
                className="card"
                timeout={{ enter: 0, exit: 0 }}
            >
                <div>
                    <div className="no-result">
                        <p>No Results Found</p>
                    </div>
                </div>
            </CSSTransition>
        );
    };

    renderResult = () => {
        if (!this.props.routes) {
            return null;
        } else if (this.props.routes.length === 0) {
            return this.renderNoResult();
        } else {
            return this.state.routes
                .slice(0, this.state.limit)
                .map(this.renderItem);
        }
    };
    render() {
        return (
            <TransitionGroup className="ResultList" appear>
                {this.renderResult()}
            </TransitionGroup>
        );
    }
}
const mapStateToProps = (state) => {
    return { routes: state.routes };
};
export default connect(mapStateToProps)(ResultList);
