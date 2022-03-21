import React from "react";
import { connect } from "react-redux";

function ErrorModal({ handleClick }) {
    return (
        <div className="ErrorModal" onClick={handleClick}>
            <i className="fa-solid fa-triangle-exclamation"></i>
            <p>Failed to connect CCP data server, try again later</p>
        </div>
    );
}

export default ErrorModal;
