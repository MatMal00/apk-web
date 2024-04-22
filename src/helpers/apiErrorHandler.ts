import axios from "axios";

export const apiErrorHandler = (error: unknown) =>
    axios.isAxiosError(error) ? error.message : "Something went wrong :o";
