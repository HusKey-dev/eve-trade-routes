import { fetchListIds, fetchCommodity, saveFile } from "./systems";
import { parallelByCount } from "../helper/helper";
import { toggleError } from "./toggleError";

export const downloadNewIds = () => async (dispatch) => {
    try {
        let typeIds = await fetchListIds();
        console.log(typeIds);
        const idsLength = typeIds.length;
        let typeIdsData = {};

        const arrayOfIdsData = await parallelByCount(typeIds, fetchCommodity);
        for (let item of arrayOfIdsData) {
            let commodity = item[1];

            if (commodity.published && commodity.packagedVolume) {
                let id = item[0];
                typeIdsData = {
                    ...typeIdsData,
                    [id]: {
                        name: commodity.name,
                        packagedVolume: commodity.packagedVolume,
                    },
                };
            }
        }
        saveFile(typeIdsData, "typeidsdata");
    } catch {
        dispatch(toggleError());
    }
};
