import React from "react";

import "./RangeInput.scss";

export const RangeInput = ({
    value,
    min,
    max,
    step,
    width,
    onInputchange,
    options,
}) => {
    const legend = () => {
        const allValues = [];
        for (let i = 0; i <= (max - min) / step; i++) {
            allValues.push(min + i * step);
        }
        return allValues.map((value) => {
            const currentMargin = `${((value - min) / (max - min)) * 100}%`;
            const currentColor = options[value]
                ? `${options[value].color}`
                : "inherit";
            const currentText = options[value] ? options[value].legend : value;
            return (
                <div
                    className="range__legend"
                    style={{ left: currentMargin, color: currentColor }}
                    key={value}
                >
                    {currentText}
                </div>
            );
        });
    };
    return (
        <span className="range-wrapper">
            <div
                style={{ width: width, backgroundColor: options[value].color }}
                className="range__inner-wrapper"
            >
                <input
                    type="range"
                    name=""
                    min={min}
                    max={max}
                    step={step}
                    onChange={(e) => onInputchange(e.target.value)}
                    value={value}
                />
                <div
                    className="range__progress-bar"
                    style={{ width: `${(+value / +max) * 100}%` }}
                >
                    <div className="range__current-dot"></div>
                </div>

                {legend()}
            </div>
        </span>
    );
};

export default RangeInput;
