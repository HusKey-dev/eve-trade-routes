import axios from "axios";
import { toggleError } from "./toggleError";
import { retry } from "./systems";

const checkPrice = (commodityName) => async (dispatch) => {
    try {
        const id = await fetchTypeId(commodityName);
        const price = id === null ? null : await fetchJitaPrice(id);

        return dispatch({
            type: "CHECK_PRICE",
            payload: price,
        });
    } catch {
        dispatch(toggleError());
    }
};

const fetchTypeId = async (userInput) => {
    const resolve = await retry(
        () =>
            axios.post("https://esi.evetech.net/latest/universe/ids", [
                userInput,
            ]),
        20,
        2000
    );

    const id = resolve.data.inventory_types?.[0].id;
    return id;
};

const fetchJitaPrice = async (id) => {
    console.log(`fetched data with ${id} query`);
    const res = await retry(
        () =>
            axios.get(
                "https://esi.evetech.net/latest/markets/10000002/orders",
                {
                    params: {
                        order_type: "all",
                        region_id: 10000002,
                        type_id: id,
                    },
                }
            ),
        20,
        2000
    );
    // jita 4-4 filter
    const orders = res.data?.filter((item) => item.location_id === 60003760);
    const bestBuy = orders[orders.length - 1];
    const sellOrders = orders.filter((order) => !order.is_buy_order);
    const bestSell =
        sellOrders.length > 0 ? sellOrders[sellOrders.length - 1] : null;

    return {
        buy: bestBuy?.price,
        sell: bestSell?.price,
    };
};

export default checkPrice;
