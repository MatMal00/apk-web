import { FC, ReactNode } from "react";
import ReactTimeAgo from "react-time-ago";
import { Modal } from "src/components/common";
import { TASK_PRIORITY, TASK_STATUS } from "src/constants";
import { TStory, TTask } from "src/types";
import cn from "classnames";

interface IColumnItemProps {
    modalContent: ReactNode | ReactNode[];
    toggleModal: () => void;
    isModalOpen: boolean;
    task: TStory | TTask;
}

export const ColumnItem: FC<IColumnItemProps> = ({
    modalContent,
    toggleModal,
    isModalOpen,
    task: { name, description, priority, status, dateAdded, estimatedCompletionTime },
}) => {
    // TEXT
    const priorityText = {
        [TASK_PRIORITY.LOW]: "Low",
        [TASK_PRIORITY.MEDIUM]: "Medium",
        [TASK_PRIORITY.HIGH]: "High",
    };

    const isDone = status === TASK_STATUS.DONE;
    const completionTime = estimatedCompletionTime > 1 ? "hours" : "hour";
    return (
        <>
            <li className="cursor-pointer space-y-4" onClick={toggleModal}>
                <div className="rounded-lg bg-white p-4 shadow dark:bg-zinc-900">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3
                                className={cn("text-lg font-semibold", {
                                    "line-through": isDone,
                                })}
                            >
                                {name}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">{description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span
                                className={cn("rounded-full px-2 py-1 text-xs font-medium", {
                                    ["bg-gray-100 text-gray-800"]: priority === TASK_PRIORITY.LOW,
                                    ["bg-green-100 text-green-800"]: priority === TASK_PRIORITY.MEDIUM,
                                    ["bg-red-200 text-red-900"]: priority === TASK_PRIORITY.HIGH,
                                })}
                            >
                                {priorityText[priority]}
                            </span>
                        </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                        <p className="text-gray-500 dark:text-gray-400">
                            Created <ReactTimeAgo date={dateAdded} locale="en-US" />
                        </p>
                        {!!estimatedCompletionTime && (
                            <p className="text-gray-500 dark:text-gray-400">{`${estimatedCompletionTime} ${completionTime}`}</p>
                        )}
                    </div>
                </div>
            </li>
            <Modal large isOpen={isModalOpen} close={toggleModal}>
                {modalContent}
            </Modal>
        </>
    );
};
