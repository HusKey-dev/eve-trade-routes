import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { connect } from "react-redux";
import { closeErrorMessage } from "../../actions";

import SearchingModal from "../SearchingModal/SearchingModal";
import ErrorModal from "../ErrorModal/ErrorModal";

import "./Modal.scss";

const Modal = (props) => {
    const Portal = (props) =>
        ReactDOM.createPortal(
            <div className="Modal">{props.children}</div>,
            document.querySelector("#modal")
        );

    if (props.error) {
        return (
            <>
                <Portal>
                    <ErrorModal handleClick={() => props.closeErrorMessage()} />
                </Portal>
            </>
        );
    } else if (props.search) {
        return (
            <>
                <Portal>
                    <SearchingModal />
                </Portal>
            </>
        );
    }

    return null;
};

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    search: state.searchModal,
    error: state.errorModal,
});

export default connect(mapStateToProps, { closeErrorMessage })(Modal);
