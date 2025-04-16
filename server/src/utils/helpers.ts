export const envResolver = (key: string, defaultValue?: string): string => {
    const value = process.env[key] || defaultValue;

    if (value === undefined) {
        throw new Error("value missing");
    }

    return value;
}

export const daysToMs = (days: number): number => {
    return days * 24 * 60 * 60 * 1000;
}