import axios from "axios";

import { hubs } from "../components/tradeRoutes/generalOptions/dropdown/regions";

let sysListJson = require("./sysData.json");
export const sysList = require("./sysData.json");

export const retry = async (asFunc, trys = 10, delay = 1000) => {
    const waitFor = (millSeconds) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, millSeconds);
        });
    };
    // try {
    //     let res = asFunc();

    //     // console.log("res is", res);
    //     return await res;
    // } catch (err) {
    //     if (trys === 1) return Promise.reject(err);
    //     console.log(`retrying...`);
    //     await waitFor(delay);
    //     return await retry(asFunc, trys - 1);
    // }
    for (let i = 0; i <= trys; i++) {
        try {
            if (i >= 1) {
                console.log("retrying... ", i);
                await waitFor(delay);
            }
            let res = await asFunc();

            // console.log("res is", res);
            return await res;
        } catch (err) {
            console.log(err);
        }
    }

    throw new Error(`failed retrying ${trys} times`);
};

export const getSystemId = async (name) => {
    const capitalize = (name) => {
        return name[0].toUpperCase() + name.slice(1).toLowerCase();
    };
    let nameFormatted = capitalize(name);
    const checkHub = (nameFormatted) => {
        let result = hubs.filter((el) => el.name === nameFormatted);
        if (result.length === 1) return result[0].id;
        return false;
    };

    for (let id in sysList) {
        if (sysList[id].name === nameFormatted) return id;
    }

    // let localId = getSystemFromLocalStorage(nameFormatted);
    // console.log(localId);
    // if (localId) return localId.id;
    // if (checkHub(nameFormatted)) return checkHub(nameFormatted);
    // const res = await axios.post(
    //     "https://esi.evetech.net/latest/universe/ids",
    //     [name]
    // );

    // if (res.data.systems) {
    //     console.log(res.data.systems[0].id);
    //     saveSystemToLocalStorage(nameFormatted, res.data.systems[0].id);
    //     return res.data.systems[0].id;
    // }
    return false;
};

export const isRegionId = (id) => {};

export const saveSystemToLocalStorage = (name, id, regionId = "") => {
    window.localStorage.setItem(name, JSON.stringify({ id, regionId }));
};

export const getSystemFromLocalStorage = (query, byId = false) => {
    if (!byId) {
        let system = JSON.parse(window.localStorage.getItem(query));
        if (system) return { ...system, name: query };
    }
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key[i];
        let cell = JSON.parse(localStorage.getItem(key));
        if (+cell?.id === +query) return { name: key, ...cell };
    }
    return false;
};

export const fetchSysRegion = async (id) => {
    let res = await axios.get(
        `https://esi.evetech.net/latest/universe/systems/${id}/`
    );
    let constellationId = res.data.constellation_id;
    res = await axios.get(
        `https://esi.evetech.net/latest/universe/constellations/${constellationId}/`
    );
    let regionId = res.data.region_id;
    return regionId;
};

export const fetchSysInfo = async (id) => {
    let res = await retry(() =>
        axios.get(`https://esi.evetech.net/latest/universe/systems/${id}/`)
    );
    res = res.data;
    // console.log(res);
    let {
        constellation_id: constellationId,
        name,
        security_status: secStatus,
    } = res;
    res = await retry(() =>
        axios.get(
            `https://esi.evetech.net/latest/universe/constellations/${constellationId}/`
        )
    );
    let regionId = res.data.region_id;
    // console.log("region id = ", regionId);
    return { [id]: { name, secStatus, regionId } };
};

export const saveFile = (data, name = "saveFileInvoked") => {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData]);
    let link = document.createElement("a");
    link.download = `${name}.json`;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
};

export const fetchTypeIds = async () => {
    const res = await axios.get(
        "https://esi.evetech.net/latest/universe/types"
    );
    return res.data;
};
// saveSystemToLocalStorage(1, 1);
export const fetchListIds = async () => {
    let res = await retry(() =>
        axios.get(`https://esi.evetech.net/latest/universe/types/`, {
            params: {
                page: 1,
            },
        })
    );
    let pages = +res.headers["x-pages"];
    console.log("res.headers = ", pages);
    if (pages === 1) {
        return res.data;
    }
    let result = res.data;
    for (let i = 2; i <= pages; i++) {
        res = (
            await retry(() =>
                axios.get(`https://esi.evetech.net/latest/universe/types`, {
                    params: { page: i },
                })
            )
        ).data;
        result = [...result, ...res];
    }
    return result;
};

export const fetchCommodity = async (id) => {
    let res = await retry(() =>
        axios.get(`https://esi.evetech.net/latest/universe/types/${id}`)
    );
    let { name, packaged_volume: packagedVolume, published } = res.data;
    return { name, packagedVolume, published };
};

export const getSecStatus = (sysId) => {
    return sysList[sysId].secStatus;
};
