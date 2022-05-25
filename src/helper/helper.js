export const parallelByCount = async (
    array,
    asFunc,
    parallel = 10,
    withRequest = true
) => {
    console.log(asFunc);
    const result = [];

    if (withRequest) {
        for (let i = 0; i < array.length; i += parallel) {
            const parallelResults = await Promise.all(
                array
                    .slice(i, i + parallel)
                    .map(async (el) => [el, await asFunc(el)])
            );
            console.log(
                `progress ${+(((i + parallel) / array.length) * 100).toFixed(
                    1
                )}%`
            );
            result.push(...parallelResults);
        }
    } else {
        for (let i = 0; i < array.length; i += parallel) {
            const parallelResults = await Promise.all(
                array.slice(i, parallel).map((el) => asFunc(el))
            );
            console.log(
                `progress ${(array.length / (i + parallel)).toPrecision(1)}%`
            );
            result.push(...parallelResults);
        }
    }
    return result;
};

export const formatPositiveNumberToStringBy3 = (number) => {
    const formatCharsBy3 = (chars) => {
        let result = "";
        for (let i = 0; i < chars.length; i++) {
            if (i && i % 3 === 0) result += " ";
            result += chars[i];
        }
        return result;
    };
    const formatPositiveIntegerToStringBy3 = (integer) => {
        const chars = integer.toString().split("").reverse();
        return formatCharsBy3(chars).split("").reverse().join("");
    };

    const str = number.toString();
    let [whole, fraction] = str.split(".");
    let result = formatPositiveIntegerToStringBy3(+whole);
    if (fraction) {
        result += `.${formatCharsBy3(fraction)}`;
    }
    return result;
};
