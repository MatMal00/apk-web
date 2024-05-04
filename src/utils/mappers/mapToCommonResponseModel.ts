export const mapToCommonResponseModel = <T>(data: { [key: string]: T }): T[] => {
    const mappedData: T[] = [];

    for (const key in data) {
        mappedData.push({ ...data[key], uid: key });
    }

    return mappedData;
};

export const mapBackToObjectModel = <T extends { uid: string }>(dataArray: T[]): { [key: string]: Omit<T, "uid"> } => {
    const originalData: { [key: string]: Omit<T, "uid"> } = {};

    for (const item of dataArray) {
        const { uid, ...rest } = item;
        originalData[uid] = rest;
    }

    return originalData;
};
