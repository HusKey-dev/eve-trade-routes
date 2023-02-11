import React from "react";

function ResultHeader({ options, selectedOption }) {
    return (
        <div className="select-menu">
            <span>{selectedOption}</span>
            <ul>{options.filter((el) => el !== selectedOption)}</ul>
        </div>
    );
}

export default ResultHeader;
