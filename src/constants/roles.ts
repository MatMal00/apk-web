export const USER_ROLE = {
    ADMIN: "ADMIN",
    DEV: "DEV",
    DEVOPS: "DEVOPS",
    WATCHER: "WATCHER",
} as const;

export type TKeyOfUserRole = keyof typeof USER_ROLE;
