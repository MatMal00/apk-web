export const mapToCommonResponseModel = <T>(data: { [key: string]: T }): T[] => {
    const mappedData: T[] = [];

    for (const key in data) {
        mappedData.push({ ...data[key], uid: key });
    }

    return mappedData;
};
