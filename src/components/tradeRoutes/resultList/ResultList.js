import React, { Component } from "react";
import { connect } from "react-redux";
import "./ResultList.scss";

export class ResultList extends Component {
    renderItem = (item) => {
        return (
            <div className="card" key={item.id}>
                <p>
                    from:{" "}
                    <span className={this.colorSecStatus(item.startsystemSec)}>
                        {item.startsystem}
                    </span>
                </p>
                <p>
                    to:{" "}
                    <span className={this.colorSecStatus(item.endsystemSec)}>
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
            <div className="ResultList">
                {this.props.routes.map((el) => this.renderItem(el))}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return { routes: state.routes };
};
export default connect(mapStateToProps)(ResultList);
