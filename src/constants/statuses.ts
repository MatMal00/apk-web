export const TASK_STATUS = {
    TO_DO: "todo",
    DOING: "doing",
    DONE: "done",
} as const;

export type TKeyOfTaskStatus = keyof typeof TASK_STATUS;

export type TTaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];
