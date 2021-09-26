import React, { Component } from 'react';
import Dropdown from './dropdown/Dropdown';

class GeneralOptions extends Component {
    render() {
        return (
            <div>
                <label htmlFor="startingSelect">Select Start Point:</label>
                <Dropdown id="startingSelect" />
                <br />
                <label htmlFor="endingSelect">Select End Point:</label>
                <Dropdown id="endingSelect" />
                <br />
                <label htmlFor="maxRange">Choose Max Range (jumps):</label>
                <input type="number" id="maxRange" />
                <br />
                <label htmlFor="maxCargo">Max Cargo Volume:</label>
                <input type="number" id="maxCargo" />
                <br />
                <label htmlFor="maxWallet">Max Wallet:</label>
                <input type="number" id="maxWallet" />
                <br />
                <label htmlFor="secFilter">Security Filter:</label>
                <input type="range" name="" id="secFilter" min="0" max="1" step="0.5" />
            </div>
        )
    }
}

export default GeneralOptions;

