import React from "react";

function PriceResult(props) {
    const formatPrice = (price) => {
        const strValue = price?.toString();

        let result = "";

        for (let i = 0; i < strValue.length; i++) {
            result += strValue[i];
            if (!((strValue.length - i - 1) % 3) && strValue.length - i > -1) {
                result += " ";
            }
        }

        return result;
    };

    const order = (item) => {
        if (props.orders[item]) {
            return (
                <tr key={item}>
                    <th>{item}</th>
                    <td>{formatPrice(props.orders[item])} ISK</td>
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
