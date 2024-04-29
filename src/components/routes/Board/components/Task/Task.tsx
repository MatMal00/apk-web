import { FC, ReactNode } from "react";
import { Modal } from "src/components/common";
import { TStory, TTask } from "src/types";

interface ITaskProps {
    modalContent: ReactNode | ReactNode[];
    toggleModal: () => void;
    isModalOpen: boolean;
    task: TStory | TTask;
}

export const Task: FC<ITaskProps> = ({ modalContent, toggleModal, isModalOpen, task: { name, description } }) => {
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
                            Medium
                        </span>
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                            Project A
                        </span>
                    </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                    <p className="text-gray-500 dark:text-gray-400">April 24, 2023</p>
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 dark:bg-gray-600 dark:text-gray-100">
                        To Do
                    </span>
                </div>
            </div>
            <Modal isOpen={isModalOpen} close={toggleModal}>
                {modalContent}
            </Modal>
        </li>
    );
};
