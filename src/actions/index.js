import axios from "axios";

import {
    getSystemId,
    saveSystemToLocalStorage,
    getSystemFromLocalStorage,
    fetchSysRegion,
    saveFile,
    fetchTypeIds,
    fetchSysInfo,
    fetchListIds,
    fetchCommodity,
    retry,
    sysList,
    getSecStatus,
} from "./systems";

import {
    hubIds,
    regions,
    goodRegionIds,
} from "../components/tradeRoutes/generalOptions/dropdown/regions";

const typeIdsData = require("./typeidsdata.json");

export const saveOptions = (type, state) => {
    console.log("save options triggered with state=", state, "type= ", type);
    return {
        type,
        payload: { data: state.data, system: state.system },
    };
};

export const validateGeneralOptions = () => async (dispatch, getState) => {
    console.log("validate options runned");
    const state = getState().placeParams;

    const checkSysName = async (name) => {
        if (name === "") return { isValid: true };
        // let res = await axios.post(
        //     "https://esi.evetech.net/latest/universe/ids",
        //     [name]
        // );
        if (await getSystemId(name)) {
            return { isValid: true };
        } else {
            return { isValid: false, error: "invalid system name" };
        }
    };
    const checkEmpty = (ids, name = "") => {
        if (ids.length === 0 && name === "") return false;
        return true;
    };
    const checkOptions = async (ids, name) => {
        if (checkEmpty(ids, name)) {
            return await checkSysName(name);
        } else {
            return { isValid: false, error: "empty fields" };
        }
    };
    let payload = {};
    for (let param in state) {
        payload = {
            ...payload,
            [param]: await checkOptions(state[param].data, state[param].system),
        };
    }

    return dispatch({ type: "VALIDATE_GENERAL", payload: await payload });
};

export const calculateRoutes = () => async (dispatch, getState) => {
    console.log("calculate routes runned up");

    // console.log(sysList);
    // saveFile(await fetchTypeIds(), "systems");
    // let sysList = require("./systemids.json");
    // let systems = {};
    // let count = 1;
    // let numberOfSystems = sysList.length;
    // for (let id of sysList) {
    //     // console.log("parsing id ", id);
    //     console.log(`fetching system ${count} of ${numberOfSystems}`);
    //     systems = { ...systems, ...(await fetchSysInfo(id)) };
    //     count++;
    // }
    // saveFile(systems, "sysData");

    // console.log("systems: ", sysList);
    // let typeIds = await fetchListIds();
    // console.log(typeIds);
    // const idsLength = typeIds.length;
    // let iteration = 1;
    // let typeIdsData = {};
    // for (let id of typeIds) {
    //     console.log(`fetching commmodity ${iteration} of ${idsLength}`);
    //     let commodity = await fetchCommodity(id);
    //     if (commodity.published && commodity.packagedVolume) {
    //         typeIdsData = {
    //             ...typeIdsData,
    //             [id]: {
    //                 name: commodity.name,
    //                 packagedVolume: commodity.packagedVolume,
    //             },
    //         };
    //     }
    //     iteration++;
    // }
    // saveFile(typeIdsData, "typeidsdata");

    await dispatch(validateGeneralOptions());
    if (
        getState().placeParams.startingOptions?.isValid &&
        getState().placeParams.endingOptions?.isValid
    ) {
        const fetchOrders = async (regionId, orderType = "all") => {
            const res = await retry(() =>
                axios.get(
                    `https://esi.evetech.net/latest/markets/${regionId}/orders`,
                    {
                        params: {
                            order_type: orderType,
                            page: 1,
                        },
                    }
                )
            );
            console.log("res.headers = ", res.headers["x-pages"]);
            if (res.headers["x-pages"] === "1") {
                return res.data;
            }
            let resultFirstPage = res.data;
            let requests = [];
            for (let i = 2; i <= +res.headers["x-pages"]; i++) {
                requests.push(
                    retry(() =>
                        axios.get(
                            `https://esi.evetech.net/latest/markets/${regionId}/orders`,
                            {
                                params: {
                                    order_type: orderType,
                                    page: i,
                                },
                            }
                        )
                    )
                );
            }
            requests = await Promise.all(requests);
            const result = [...resultFirstPage];
            requests.map((el) => el.data).forEach((el) => result.push(...el));
            return result;
        };
        // console.log(await fetchOrders(10000002, "buy"));
        let { startingOptions, endingOptions } = getState().placeParams;

        const createFormatIds = async (params) => {
            let placeIds = { regions: [], systems: [] };
            console.log(params);
            for (let id of params.data) {
                if (hubIds.includes(id)) {
                    placeIds.systems.push(id);
                } else {
                    placeIds.regions.push(id);
                }
            }
            if (params.system !== "") {
                let sysId = +(await getSystemId(params.system));
                if (!placeIds.systems.includes(sysId)) {
                    placeIds.systems.push(sysId);
                }
            }
            placeIds.systems = placeIds.systems.filter((sysId) => {
                // preventing doble fetching data in case of one of chosen regions already includes the chosen system and also cutting off regions without stations or without standard gates (Pochven and Thera)
                const sysRegion = sysList[sysId.toString()].regionId;

                return (
                    !placeIds.regions.includes(sysRegion) &&
                    regions.some((region) => region.id === sysRegion)
                );
            });
            return placeIds;
        };

        const startIds = await createFormatIds(startingOptions);
        const endIds = await createFormatIds(endingOptions);

        const getItem = async (id) => {
            if (!typeIdsData[id]) {
                let { name, packagedVolume } = await fetchCommodity(id);
                return { name, packagedVolume };
            }
            return typeIdsData[id];
        };

        const addFormattedOrder = async (order) => {
            if (order.min_volume > 1) return;
            let { name, packagedVolume } = await getItem(order.type_id);
            const formattedOrder = {
                location: order.system_id,
                type: order.is_buy_order ? "buy" : "sell",
                price: order.price,
                volume: order.volume_remain,
                typeId: order.type_id,
                orderId: order.order_id,
                name,
                packagedVolume,
                secStatus: getSecStatus(order.system_id),
            };

            const { price, volume, orderId } = formattedOrder;
            const insideFormattedOrder = {
                price,
                volume,
                name,
                packagedVolume,
                orderId,
            };
            if (formattedOrder.type === "sell") {
                if (!startingOrders[formattedOrder.typeId]) {
                    startingOrders[formattedOrder.typeId] = {
                        [formattedOrder.location]: [insideFormattedOrder],
                    };
                } else if (
                    !startingOrders[formattedOrder.typeId][
                        formattedOrder.location
                    ]
                ) {
                    startingOrders[formattedOrder.typeId][
                        formattedOrder.location
                    ] = [insideFormattedOrder];
                } else {
                    startingOrders[formattedOrder.typeId][
                        formattedOrder.location
                    ].push(insideFormattedOrder);
                }
            } else {
                if (!endingOrders[formattedOrder.typeId]) {
                    endingOrders[formattedOrder.typeId] = {
                        [formattedOrder.location]: [insideFormattedOrder],
                    };
                } else if (
                    !endingOrders[formattedOrder.typeId][
                        formattedOrder.location
                    ]
                ) {
                    endingOrders[formattedOrder.typeId][
                        formattedOrder.location
                    ] = [insideFormattedOrder];
                } else {
                    endingOrders[formattedOrder.typeId][
                        formattedOrder.location
                    ].push(insideFormattedOrder);
                }
            }
        };
        const [startingOrders, endingOrders] = [{}, {}];
        const addOrders = async (ids, orderType = "sell") => {
            console.log("starting adding ", orderType, " orders");
            for (let id of ids.regions) {
                let res = await fetchOrders(id, orderType);
                res.forEach(async (element) => {
                    await addFormattedOrder(element);
                });
            }
            for (let id of ids.systems) {
                console.log("id is", id);
                const regionId = sysList[id.toString()].regionId;
                const res = await fetchOrders(regionId, orderType);
                // console.log("res is ", res);
                const sysOrders = res.filter((order) => order.system_id === id);
                // console.log("sysOrders is ", sysOrders);
                sysOrders.forEach(async (element) => {
                    await addFormattedOrder(element);
                });
            }
        };

        await addOrders(startIds, "sell");
        await addOrders(endIds, "buy");

        console.log("startIds is", startIds);
        // console.log(startingOrders);

        console.log("endIds is", endIds);
        // console.log(endingOrders);

        const createRoutes = (starting, ending) => {
            console.log("createRoutes activated");
            // TODO: take these params from user
            const maxCargo = 60000;
            const minProfit = 10000000;
            const taxRate = 0.051;
            const maxWallet = 5000000000;

            const routes = [];

            const isWorthy = (orders) => {
                let income = 0;
                let cargoRemains = maxCargo;
                for (let order of orders) {
                    const fullVolume = order.volume * order.packagedVolume;
                    if (fullVolume >= cargoRemains) {
                        income +=
                            Math.floor(cargoRemains / order.packagedVolume) *
                            order.price;
                        break;
                    } else {
                        income += fullVolume * order.price;
                        cargoRemains -= fullVolume;
                    }
                }
                income = income * (1 - taxRate);
                return income > minProfit;
            };

            const calcProfit = (sellorders, buyorders) => {
                // console.log("calcProfit called");
                if (sellorders[0].price >= buyorders[0].price * (1 - taxRate))
                    return 0;

                let income = 0;
                let cargoRemains = maxCargo;
                let walletRemains = maxWallet;
                let totalQuantity = 0;

                const createCopy = (arrayOfPlainObjects) => {
                    if (arrayOfPlainObjects.length > 0)
                        return arrayOfPlainObjects.map((el) => ({ ...el }));
                    return [];
                };
                const copyedSellOrders = createCopy(sellorders);
                const copyedBuyOrders = createCopy(buyorders);

                const minQuantity = () => {
                    if (
                        copyedBuyOrders.length === 0 ||
                        copyedSellOrders.length === 0
                    )
                        return 0;
                    const [orderStart, orderEnd] = [
                        copyedSellOrders[0],
                        copyedBuyOrders[0],
                    ];
                    return [
                        orderStart.volume,
                        Math.floor(cargoRemains / orderStart.packagedVolume),
                        orderEnd.volume,
                        Math.floor(walletRemains / orderStart.price),
                    ].reduce((previous, current) =>
                        previous <= current ? previous : current
                    );
                };
                const transactOrder = (ordersstart, ordersend, quantity) => {
                    cargoRemains -= quantity * ordersstart[0].packagedVolume;
                    walletRemains -= quantity * ordersstart[0].price;
                    income += quantity * ordersend[0].price * (1 - taxRate);
                    totalQuantity += quantity;
                    ordersstart[0].volume -= quantity;
                    ordersend[0].volume -= quantity;
                    if (ordersstart[0].volume === 0) ordersstart.shift();
                    if (ordersend[0].volume === 0) ordersend.shift();
                };

                while (minQuantity() >= 1) {
                    transactOrder(
                        copyedSellOrders,
                        copyedBuyOrders,
                        minQuantity()
                    );
                }

                return {
                    profit: income - maxWallet + walletRemains,
                    quantity: totalQuantity,
                    volume: maxCargo - cargoRemains,
                };
            };

            for (let typeId in ending) {
                for (let endsystem in ending[typeId]) {
                    const sortedEndingOrders = [
                        ...ending[typeId][endsystem],
                    ].sort((a, b) => b.price - a.price);

                    if (isWorthy(sortedEndingOrders)) {
                        for (let startsystem in starting[typeId]) {
                            const sortedStartingOrders = [
                                ...starting[typeId][startsystem],
                            ].sort((a, b) => a.price - b.price);

                            const { profit, quantity, volume } = calcProfit(
                                sortedStartingOrders,
                                sortedEndingOrders
                            );
                            if (profit >= minProfit) {
                                console.log("profit >", minProfit);
                                const buyPrice = sortedStartingOrders[0].price;
                                const sellPrice = sortedEndingOrders[0].price;
                                routes.push({
                                    startingSystem: +startsystem,
                                    startsystem: sysList[startsystem].name,
                                    endingSystem: +endsystem,
                                    commodity: sortedEndingOrders[0].name,
                                    typeId,
                                    quantity,
                                    testField:
                                        (
                                            (quantity *
                                                (sellPrice - buyPrice)) /
                                            1000000
                                        )
                                            .toFixed(1)
                                            .toString() + "mil",
                                    difference:
                                        (
                                            (quantity * (sellPrice - buyPrice) -
                                                profit) /
                                            1000000
                                        )
                                            .toFixed(1)
                                            .toString() + "mil",
                                    buyPrice,
                                    sellPrice,
                                    profitPerUnit:
                                        ((sellPrice / buyPrice - 1) * 100)
                                            .toFixed(1)
                                            .toString() + "%",
                                    volume,
                                    profit: Math.round(profit / 100000) / 10,
                                });
                            }
                        }
                    }
                }
            }

            return routes;
        };

        let possibleRoutes = createRoutes(startingOrders, endingOrders);
        console.log("sorting results");
        possibleRoutes.sort((a, b) => b.profit - a.profit);
        console.log(possibleRoutes);

        // let reS = await axios.get(
        //     "https://esi.evetech.net/latest/route/30000142/30002187"
        // );
        // console.log(reS);

        const getFormattedRoute = async (origin, dest, secFilter) => {
            const fetchRoute = async (
                origin,
                dest,
                flag = "shortest",
                avoidList = []
            ) => {
                return (
                    await retry(
                        () =>
                            axios.get(
                                `https://esi.evetech.net/latest/route/${origin}/${dest}/`,
                                { params: { flag, avoidList } }
                            ),
                        15,
                        2500
                    )
                ).data;
            };

            let systems;
            if (secFilter <= 0) {
                systems = await fetchRoute(origin, dest);
            } else if (secFilter >= 0.5) {
                systems = await fetchRoute(origin, dest, "secure");
                if (
                    systems.some(
                        (system) => getSecStatus(system.toString()) < 0.5
                    )
                )
                    return { jumps: false };
            } else {
                const avoidList = [];
                let badSystems = [];
                try {
                    do {
                        systems = await fetchRoute(
                            origin,
                            dest,
                            "shortest",
                            avoidList
                        );
                        badSystems = systems.filter(
                            (sysId) => getSecStatus(sysId) <= 0
                        );
                        if (badSystems.length > 0)
                            avoidList.push(...badSystems);
                    } while (badSystems.length && avoidList.length < 200);
                } catch {
                    return { jumps: false };
                }
                if (avoidList.length >= 200) return { jumps: false };
            }

            return {
                origin: sysList[origin.toString()].name,
                dest: sysList[dest.toString()].name,
                jumps: systems.length - 1,
            };
        };
        const preparedPossibleRoutes = {};
        const preparedRoutes = require("./preparedpossibleroutes.json");
        const validSystems = require("./validystems.json");
        const preparedHubsRoutes = require("./preparedhubsroutes.json");
        console.log(preparedHubsRoutes);
        const prefetched =
            !preparedHubsRoutes?.["30000142"]?.["30000001"] &&
            !preparedHubsRoutes?.["30000001"]?.["30000142"];
        console.log("prefetched is", prefetched);
        let iter = 0;
        for (let item of possibleRoutes) {
            iter++;
            const starting = item.startingSystem.toString();
            const ending = item.endingSystem.toString();
            const isAlreadyFetched =
                preparedPossibleRoutes?.[starting]?.[ending] ||
                preparedPossibleRoutes?.[ending]?.[starting];
            if (
                !preparedHubsRoutes?.[starting]?.[ending] &&
                !preparedHubsRoutes?.[ending]?.[starting] &&
                !isAlreadyFetched
            ) {
                const allSec = {};
                allSec.nulsec = (
                    await getFormattedRoute(+starting, +ending, 0)
                ).jumps;

                if (getSecStatus(starting) > 0 && getSecStatus(ending) > 0) {
                    allSec.lowsec = (
                        await getFormattedRoute(+starting, +ending, 0.4)
                    ).jumps;
                }
                if (
                    getSecStatus(starting) >= 0.5 &&
                    getSecStatus(ending) >= 0.5
                ) {
                    allSec.highsec = (
                        await getFormattedRoute(+starting, +ending, 1)
                    ).jumps;
                }
                if (preparedPossibleRoutes[starting]) {
                    preparedPossibleRoutes[starting][ending] = { ...allSec };
                } else {
                    preparedPossibleRoutes[starting] = {
                        [ending]: { ...allSec },
                    };
                }
                let progress = (iter / possibleRoutes.length) * 100;
                if (!iter % 10) {
                    console.log(`fetching ${progress}%`);
                }
            }
        }
        // validRoutes.sort((a, b) => b.profitPerJump - a.profitPerJump);
        // console.log(validRoutes);

        // const systemsWithStationsAndGates = [];
        // for (let id in sysList) {
        //     if (goodRegionIds.includes(+sysList[id].regionId)) {
        //         let res = await retry(() =>
        //             axios.get(`https://esi.evetech.net/latest/universe/systems/${id}/
        //     `)
        //         );
        //         res = res.data?.stations;
        //         if (res) systemsWithStationsAndGates.push(+id);
        //     }
        // }
        // console.log(systemsWithStationsAndGates);
        // saveFile(systemsWithStationsAndGates, "validystems");

        // const validHighSec = validSystems.filter(
        //     (id) => sysList[id.toString()].secStatus >= 0.5
        // );
        // console.log(validHighSec);

        const searchRoutes = async (startIds, destIds) => {
            if (typeof startIds === "number") startIds = [startIds];
            let result = {};
            for (let start of startIds) {
                console.log("staritng fetching routes for id", start);
                for (let dest of destIds) {
                    const addiction = {};
                    if (start !== dest) {
                        let res = await getFormattedRoute(start, dest, 0);
                        const { jumps: nulsec } = res;
                        addiction.nulsec = nulsec;
                        const destSec = getSecStatus(dest);
                        if (destSec > 0) {
                            res = await getFormattedRoute(start, dest, 0.4);
                            const { jumps: lowsec } = res;
                            addiction.lowsec = lowsec;
                        }
                        if (destSec >= 0.5) {
                            res = await getFormattedRoute(start, dest, 1);
                            const { jumps: highsec } = res;
                            addiction.highsec = highsec;
                        }
                        if (result[start]) {
                            result[start][dest] = addiction;
                        } else {
                            result = {
                                ...result,
                                [start]: { [dest]: addiction },
                            };
                        }
                    }
                }
            }
            return result;
        };

        return dispatch({ type: "CALCULATE_ROUTES", payload: "some data" });
    } else {
        console.log("if statement returned false", getState().placeParams);
    }
};
