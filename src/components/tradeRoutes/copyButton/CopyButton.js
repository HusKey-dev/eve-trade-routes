import React from "react";
import "./CopyButton.scss";

function CopyButton({ buffer }) {
    return (
        <button
            className="CopyButton"
            onClick={() => navigator.clipboard.writeText(buffer)}
        >
            Copy
        </button>
    );
}

export default CopyButton;
