import { User } from "firebase/auth";
import { TCommonUser } from "src/types/auth";

export const mapToCommonUserModel = (user: User): TCommonUser => ({
    createdAt: user.metadata.creationTime ?? "",
    username: user.displayName ?? "",
    email: user.email ?? "",
    role: "",
});
