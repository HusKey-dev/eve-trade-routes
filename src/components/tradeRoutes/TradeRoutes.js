import React from 'react';

import GeneralOptions from './generalOptions/GeneralOptions';
import ShipOptions from './shipOptions/ShipOptions';
import CharacterOptions from './characterOptions/CharacterOptions';
import ResultList from './resultList/ResultList';

import './TradeRoutes.scss';

function TradeRoutes() {

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log('form submitted');
    }

    return (
        <div className="TradeRoutes" >
            <div className="container">
                <form onSubmit={e => onSubmitHandler(e)}>
                    <GeneralOptions />
                    <ShipOptions />
                    <CharacterOptions />
                    <button type="submit">Calculate Routes</button>
                    <ResultList />
                </form>
            </div>
        </div>
    )
}

export default TradeRoutes;
