import React from 'react';

import GeneralOptions from './generalOptions/GeneralOptions';
import ShipOptions from './shipOptions/ShipOptions';
import CharacterOptions from './characterOptions/CharacterOptions';
import ResultList from './resultList/ResultList';

import './TradeRoutes.scss';

function TradeRoutes() {
    return (
        <div className="TradeRoutes" >
            <div className="container">
                <GeneralOptions />
                <ShipOptions />
                <CharacterOptions />
                <ResultList />
            </div>
        </div>
    )
}

export default TradeRoutes;
