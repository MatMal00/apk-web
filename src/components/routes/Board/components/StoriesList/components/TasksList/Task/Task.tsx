import { FC, useCallback, useState } from "react";
import { TTask } from "src/types";
import { Column } from "../../../../Column";

interface ITaskProps {
    task: TTask;
}

export const Task: FC<ITaskProps> = ({ task }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggleModal = useCallback(() => setIsModalOpen((prev) => !prev), []);

    return (
        <>
            <Column.Item
                toggleModal={handleToggleModal}
                isModalOpen={isModalOpen}
                modalContent={<div></div>}
                task={task}
            />
        </>
    );
};
