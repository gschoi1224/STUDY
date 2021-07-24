export const pick = <T, K extends keyof T>(obj: T, keys: K[]) =>
    keys
        .map(key => ({ [key]: obj[key] }))
        .reduce((acc, val) => ({ ...acc, ...val }), {});
