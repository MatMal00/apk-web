export const USER_ROLE = {
    ADMIN: "ADMIN",
    DEV: "DEV",
    DEVOPS: "DEVOPS",
    WATCHER: "WATCHER",
} as const;

export const PROJECT_ROLE = {
    DEV: "DEV",
    DEVOPS: "DEVOPS",
} as const;

export type TKeyOfUserRole = keyof typeof USER_ROLE;

export type TKeyOfProjectRole = keyof typeof PROJECT_ROLE;
