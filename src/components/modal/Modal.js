import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { connect } from "react-redux";
import "./Modal.scss";

const Modal = (props) => {
    if (props.display) {
        return ReactDOM.createPortal(
            <div className="Modal">{props.children}</div>,
            document.querySelector("#modal")
        );
    }

    return null;
};

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    display: state.searchModal,
});

export default connect(mapStateToProps, null)(Modal);
