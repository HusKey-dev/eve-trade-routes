import React, { useState } from 'react';
import { empireRegions, outlawRegions, hubs } from './regions.js';

function Dropdown() {
    const [isActive, setIsActive] = useState(false);

    const buttonContent = isActive ? 'A' : 'V';

    const renderList = (isActive) => {
        if (!isActive) {
            return null;
        }

        const renderItems = (array) => {
            return array.map(system => <li key={system.id}>{system.name}</li>)
        }

        return (
            <div>
                <div>
                    <ul>{renderItems(empireRegions)}</ul>
                </div>
                <div>
                    <ul>{renderItems(outlawRegions)}</ul>
                </div>
                <div>
                    <ul>{renderItems(hubs)}</ul>
                </div>
                <label>Or Enter Scpecific System Name:
                    <input type="text" />
                </label>
            </div>
        )
    };

    return (
        <>
            <button onClick={() => { setIsActive(!isActive) }}>{buttonContent}</button>
            {renderList(isActive)}
        </>
    )
}

export default Dropdown;