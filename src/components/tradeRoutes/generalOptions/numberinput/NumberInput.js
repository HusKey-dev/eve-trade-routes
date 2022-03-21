import React from "react";
import { useRef } from "react";
import "./NumberInput.scss";

function NumberInput({
    value,
    size,
    onNumberInputChange,
    id,
    onNumberInputBlur,
}) {
    const inputEl = useRef();
    const handleMinusClick = () => {
        if (inputEl.current.value > 0) {
            inputEl.current.value--;
            onNumberInputChange(inputEl.current.value, id);
        }
    };
    const handlePlusClick = () => {
        if (inputEl.current.value < 10 ** size - 1) inputEl.current.value++;
        onNumberInputChange(inputEl.current.value, id);
    };
    return (
        <div className="NumberInput">
            <div className="Number-input__container">
                <div onClick={handleMinusClick} className="count-modifier">
                    -
                </div>
                <input
                    maxLength={size}
                    type="text"
                    ref={inputEl}
                    value={value}
                    onChange={(e) => onNumberInputChange(e.target.value, id)}
                    onBlur={(e) => onNumberInputBlur(+e.target.value, id)}
                    style={{ width: `${size}ch` }}
                />
                <div onClick={handlePlusClick} className="count-modifier">
                    +
                </div>
            </div>
        </div>
    );
}

export default NumberInput;
