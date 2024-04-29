export const timestampToDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toISOString().split("T")[0]; // Converts the date to ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
};
