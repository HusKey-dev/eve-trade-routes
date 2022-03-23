import React from "react";
import "./ErrorModal.scss";
import exclamation from "../../images/exclamation_sign.svg";
function ErrorModal({ handleClick }) {
    return (
        <div className="ErrorModal" onClick={handleClick}>
            <img src={exclamation} alt="warning" />
            <p>Failed to connect with CCP data server, try again later</p>
            <div>
                <button className="btn">Ok</button>
            </div>
        </div>
    );
}

export default ErrorModal;
