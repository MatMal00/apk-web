import { FC } from "react";
import { TStory } from "src/types";
import { TASK_PRIORITY, TASK_STATUS } from "src/constants";
import cn from "classnames";

interface IStatusProps {
    story: TStory;
}

export const Status: FC<IStatusProps> = ({ story: { priority, status, estimatedCompletionTime } }) => {
    const priorityText = {
        [TASK_PRIORITY.LOW]: "Low",
        [TASK_PRIORITY.MEDIUM]: "Medium",
        [TASK_PRIORITY.HIGH]: "High",
    };
    const statusText = {
        [TASK_STATUS.TO_DO]: "To do",
        [TASK_STATUS.DOING]: "Doing",
        [TASK_STATUS.DONE]: "Done",
    };

    const completionTime = estimatedCompletionTime > 1 ? "hours" : "hour";
    return (
        <div className="flex flex-col gap-2 pr-5">
            <span
                className={cn("w-fit self-end rounded-full px-2 py-1 text-xs font-medium", {
                    ["bg-gray-100 text-gray-800"]: priority === TASK_PRIORITY.LOW,
                    ["bg-green-100 text-green-800"]: priority === TASK_PRIORITY.MEDIUM,
                    ["bg-red-200 text-red-900"]: priority === TASK_PRIORITY.HIGH,
                })}
            >
                {priorityText[priority]}
            </span>

            <div className="flex items-center gap-2">
                <div
                    className={cn(
                        "h-3 w-3 rounded-full bg-yellow-500",

                        {
                            ["bg-gray-500"]: status === TASK_STATUS.TO_DO,
                            ["bg-yellow-500"]: status === TASK_STATUS.DOING,
                            ["bg-red-500"]: status === TASK_STATUS.DONE,
                        }
                    )}
                />
                <span>{statusText[status]}</span>
            </div>
            {!!estimatedCompletionTime && (
                <p className="self-end text-gray-500 dark:text-gray-400">{`${estimatedCompletionTime} ${completionTime}`}</p>
            )}
        </div>
    );
};
