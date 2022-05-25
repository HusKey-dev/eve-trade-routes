import React from "react";
import { formatPositiveNumberToStringBy3 } from "../../../helper/helper";

function PriceResult(props) {
    const order = (item) => {
        if (props.orders[item]) {
            return (
                <tr key={item}>
                    <th>{item}</th>
                    <td>
                        {formatPositiveNumberToStringBy3(props.orders[item])}{" "}
                        ISK
                    </td>
                </tr>
            );
        }
    };
    const tableData = () => {
        let result = [];
        for (let key in props.orders) {
            result.push(order(key));
        }
        return result;
    };

    if (props.shouldRender) {
        return (
            <div className="result">
                <table>
                    <caption>Jita orders</caption>
                    <tbody>{tableData()}</tbody>
                </table>
            </div>
        );
    }

    return null;
}

export default PriceResult;
