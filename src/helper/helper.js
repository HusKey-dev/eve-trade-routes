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
