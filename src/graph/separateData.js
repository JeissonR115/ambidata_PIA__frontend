export function separateData(data) {
    return data.reduce((result, obj) => {
        Object.entries(obj).forEach(([key, value]) => {
            if (!result[key]) {
                result[key] = [];
            }
            if (key === 'fecha') {
                // Solo almacenar hasta la hora en formato de cadena
                const formattedDate = value.slice(0, 13).replace('T', '  ');
                result[key].push(formattedDate+'h');
            } else{
                result[key].push(value);
            }
            
        });
        return result;
    }, {});
}
