import { FC, ReactNode } from "react";
import ReactTimeAgo from "react-time-ago";
import { Modal } from "src/components/common";
import { TASK_PRIORITY, TASK_STATUS } from "src/constants";
import { TStory, TTask } from "src/types";

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
    const priorityText = {
        [TASK_PRIORITY.LOW]: "Low",
        [TASK_PRIORITY.MEDIUM]: "Medium",
        [TASK_PRIORITY.HIGH]: "High",
    };
    const statusText = {
        [TASK_STATUS.TO_DO]: "to do",
        [TASK_STATUS.DOING]: "doing",
        [TASK_STATUS.DONE]: "done",
    };

    const completionTime = estimatedCompletionTime > 1 ? "hours" : "hour";
    return (
        <li className="cursor-pointer space-y-4" onClick={toggleModal}>
            <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-700">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-semibold">{name}</h3>
                        <p className="text-gray-500 dark:text-gray-400">{description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                            {priorityText[priority]}
                        </span>
                        <span className="whitespace-nowrap rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-600 dark:text-gray-100">
                            {statusText[status]}
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
            <Modal isOpen={isModalOpen} close={toggleModal}>
                {modalContent}
            </Modal>
        </li>
    );
};
