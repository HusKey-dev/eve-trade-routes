import React, { useState } from 'react';
import { empireRegions, outlawRegions, hubs } from './regions.js';
import './Dropdown.scss';

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
            <div className="Dropdown">
                <div className="columnContainer">
                    <div className="regionColumn">
                        <p>Empire Regions</p>
                        {renderItems(empireRegions)}
                    </div>
                    <div className="regionColumn">
                        <p>Outlaw Regions</p>
                        {renderItems(outlawRegions)}
                    </div>
                    <div className="regionColumn">
                        <p>Hubs</p>
                        {renderItems(hubs)}
                    </div>
                </div>
                <label className="specificSystem">Or Enter Scpecific System Name:
                    <input type="text" />
                </label>
            </div >
        )
    };

    return (
        <>
            <button onClick={(e) => { e.preventDefault(); setIsActive(!isActive) }}>{buttonContent}</button>
            {renderList(isActive)}
        </>
    )
}

export default Dropdown;