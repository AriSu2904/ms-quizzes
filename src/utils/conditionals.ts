export function isEqual(val1: any, val2: any) {
    return val1 === val2;
}

export function isEmptyArray(arr: any[]) {
    return arr.length === 0;
}

export function isEmptyObject(obj: any) {
    return Object.keys(obj).length === 0;
}