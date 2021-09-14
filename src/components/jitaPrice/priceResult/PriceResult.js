import React from 'react';

function PriceResult(props) {
    console.log(props);
    const formatPrice = (price) => {
        const strValue = price?.toString();
        console.log(`strValue = ${strValue}`)
        let result = '';
        if (true) {
            for (let i = 0; i < strValue.length; i++) {
                console.log(strValue[i]);
                result += strValue[i];
                if (!((strValue.length - i - 1) % 3) && (strValue.length - i > -1)) {
                    result += " ";
                }
            }
            console.log(result);
            return result;
        }
    }

    const order = (item) => {
        if (props.orders[item]) {
            return (
                <tr key={item}>
                    <th>{item}</th>
                    <td>{formatPrice(props.orders[item])} ISK</td>
                </tr>
            )
        }
    }
    const tableData = () => {
        let result = [];
        for (let key in props.orders) {
            console.log(`order(${key}) is ${order(key)}`);
            result.push(order(key));
        }
        console.log(result);
        return result;
    }

    if (props.shouldRender) {
        return (
            <div className="result">
                <table>
                    <caption>Jita orders</caption>
                    <tbody>
                        {tableData()}
                    </tbody>
                </table>
            </div>
        )
    }

    return null;
}

export default PriceResult;
