export const envResolverString = (key: string, defaultValue?: string): string => {
    const value = process.env[key] || defaultValue;

    if (value === undefined) {
        throw new Error("value missing");
    }

    return value;
}

export const envResolverNumber = (key: string, defaultValue?: number): number => {
    const value = process.env[key] || defaultValue;

    if (value === undefined) {
        throw new Error("value missing");
    }

    const num = Number(value);
    if (isNaN(num)) throw new Error("nan value");

    return num;
}

export const daysToMs = (days: number): number => {
    return days * 24 * 60 * 60 * 1000;
}

export const todayPlus = {
    minutes: (m: number) => new Date(Date.now() + m * 60_000),
    hours: (h: number) => new Date(Date.now() + h * 3_600_000),
    days: (d: number) => new Date(Date.now() + d * 86_400_000),
};