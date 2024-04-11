export function separateData(data) {
    return data.reduce((result, obj) => {
        Object.entries(obj).forEach(([key, value]) => {
            if (!result[key]) {
                result[key] = [];
            }
            result[key].push(value);
        });
        return result;
    }, {});
}
