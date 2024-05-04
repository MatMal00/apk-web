import { FC, useCallback, useState } from "react";
import { TCommonUser, TTask } from "src/types";
import { Column } from "../../../Column";
import { InfoModalForm } from "../InfoModalForm";

interface ITaskProps {
    task: TTask;
    updateTaskData: (updatedData: TTask) => Promise<void>;
    deleteTask: (task: TTask) => Promise<void>;
    users: TCommonUser[];
}

export const Task: FC<ITaskProps> = ({ task, deleteTask, updateTaskData, users }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggleModal = useCallback(() => setIsModalOpen((prev) => !prev), []);

    return (
        <>
            <Column.Item
                toggleModal={handleToggleModal}
                isModalOpen={isModalOpen}
                modalContent={
                    <InfoModalForm
                        close={handleToggleModal}
                        task={task}
                        deleteTask={deleteTask}
                        updateTaskData={updateTaskData}
                        users={users}
                    />
                }
                task={task}
            />
        </>
    );
};
