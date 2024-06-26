import { TKeyOfUserRole } from "src/constants";

export type TCommonUser = {
    email: string;
    username: string;
    role: TKeyOfUserRole;
    createdAt: string;
    uid: string;
    projects?: string[];
};
