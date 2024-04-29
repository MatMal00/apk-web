import { FC, useCallback, useState } from "react";
import { TTask } from "src/types";
import { ColumnItem } from "../../../components";

interface ITaskProps {
    task: TTask;
}

export const Task: FC<ITaskProps> = ({ task }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggleModal = useCallback(() => setIsModalOpen((prev) => !prev), []);

    return (
        <>
            <ColumnItem
                toggleModal={handleToggleModal}
                isModalOpen={isModalOpen}
                modalContent={<div></div>}
                task={task}
            />
        </>
    );
};
