export const TASK_STATUS = {
    TO_DO: "todo",
    DOING: "doing",
    DONE: "done",
} as const;

export type TKeyOfTaskStatus = keyof typeof TASK_STATUS;

export type TTaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

// PRIORITY
export const TASK_PRIORITY = {
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high",
} as const;

export type TKeyOfPriority = keyof typeof TASK_PRIORITY;

export type TPriority = (typeof TASK_PRIORITY)[keyof typeof TASK_PRIORITY];
