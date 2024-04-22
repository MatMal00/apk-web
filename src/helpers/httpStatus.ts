export const httpStatus = (statusCode: number) => {
    switch (true) {
        case statusCode >= 200 && statusCode <= 299:
            return "success";
        case statusCode >= 400 && statusCode <= 499:
            return "client error";
        case statusCode === 500:
            return "server error";
        default:
            return "unknown";
    }
};
