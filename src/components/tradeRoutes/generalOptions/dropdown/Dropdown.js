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
            return array.map(system => <React.Fragment key={system.id}>
                <label>
                    <input type="checkbox" name={system.id}></input>
                    {system.name}</label>
            </React.Fragment>)
        }

        return (
            <div>
                <div>
                    <p>Empire Regions</p>
                    {renderItems(empireRegions)}
                </div>
                <div>
                    <p>Outlaw Regions</p>
                    {renderItems(outlawRegions)}
                </div>
                <div>
                    <p>Hubs</p>
                    {renderItems(hubs)}
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