import React, { Component } from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./ResultList.scss";

export class ResultList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: this.props.routes,
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
                    <p>jumps: {item.jumps}</p>
                    <p>profit: {item.profit} mil isk</p>
                    <p>profit per jump: {item.profitPerJump} mil isk</p>
                    <p>commodity: {item.commodity}</p>
                    <p>quantity: {item.quantity}</p>
                    <p>you buy: {item.buyPrice} isk</p>
                    <p>you sell: {item.sellPrice} isk</p>
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
    render() {
        return (
            <TransitionGroup className="ResultList" appear>
                {this.state.routes.map(this.renderItem)}
            </TransitionGroup>
        );
    }
}
const mapStateToProps = (state) => {
    return { routes: state.routes };
};
export default connect(mapStateToProps)(ResultList);
