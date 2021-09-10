import React, { useState } from 'react';
import axios from 'axios';

import './JitaPrice.scss';


function JitaPrice() {
    const [userInput, setUserInput] = useState('');
    const [priceResponse, setPriceResponse] = useState(null);

    const renderPriceResult = () => {
        if (priceResponse) {
            return (
                <div className="result">
                    <p>Buy is {priceResponse.buy}</p>
                    <p>Sell is {priceResponse.sell}</p>
                </div>
            )
        }
    };

    const fetchJitaPrice = async (id) => {
        console.log(`fetched data with ${id} query`);
        const res = await axios.get('https://esi.evetech.net/latest/markets/10000002/orders', {
            params: {
                order_type: 'all',
                region_id: 10000002,
                type_id: id
            }
        });
        // jita 4-4 filter
        const orders = res.data?.filter(item => item.location_id === 60003760);
        const bestBuy = orders[orders.length - 1];
        const sellOrders = orders.filter(order => !order.is_buy_order);
        const bestSell = sellOrders.length > 0 ? sellOrders[sellOrders.length - 1] : null;
        setPriceResponse({
            buy: bestBuy?.price,
            sell: bestSell?.price
        });
    }

    const fetchTypeId = async (userInput) => {
        try {
            const resolve = await axios.post('https://esi.evetech.net/latest/universe/ids', [userInput]);
            console.log(resolve);
            const id = resolve.data.inventory_types?.[0].id;
            console.log(id);
            fetchJitaPrice(id);
            return id;


        } catch (error) {
            console.log(error);
            return 0;
        }
    }

    return (
        <div className="JitaPrice">
            <div className="container">
                <label>Copypaste The Item Name Here:
                    <input
                        type="text"
                        placeholder="Item Name"
                        value={userInput}
                        onChange={e => setUserInput(e.target.value)}>
                    </input>
                </label>
                <button type='submit' onClick={() => fetchTypeId(userInput)}>Check The Price</button>
                {renderPriceResult()}
            </div>
        </div>
    )
};

export default JitaPrice;
