export const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x));
