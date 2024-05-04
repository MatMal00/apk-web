import { TASK_STATUS, TTaskStatus } from "src/constants";
import { TAssignedUser } from "src/types";

export const updateEndDate = (nextStatus: TTaskStatus) => {
    switch (true) {
        case nextStatus === TASK_STATUS.DONE:
            return new Date().getTime();
        default:
            return null;
    }
};

export const updateStartDate = (initialStatus: TTaskStatus, nextStatus: TTaskStatus, prevStartDate?: number | null) => {
    switch (true) {
        case initialStatus === TASK_STATUS.TO_DO && nextStatus === TASK_STATUS.DOING:
            return new Date().getTime();
        case nextStatus === TASK_STATUS.TO_DO:
            return null;
        default:
            return prevStartDate ?? null;
    }
};

export const updateStatus = (
    initialStatus: TTaskStatus,
    nextStatus: TTaskStatus,
    initialUser?: TAssignedUser,
    nextUser?: TAssignedUser
) => {
    console.log({ initialStatus, nextStatus, initialUser, nextUser });
    switch (true) {
        case !initialUser && !nextUser && (nextStatus === TASK_STATUS.DOING || nextStatus === TASK_STATUS.DONE):
            throw new Error("You must assign a user to the task before changing the status to 'Doing' or 'Done'");

        case initialStatus === TASK_STATUS.TO_DO && nextStatus === TASK_STATUS.DONE:
            throw new Error("You must first change the status to 'Doing' before changing it to 'Done'");

        case !initialUser && nextUser && initialStatus === TASK_STATUS.TO_DO:
            return TASK_STATUS.DOING;
        default:
            return nextStatus ?? null;
    }
};
