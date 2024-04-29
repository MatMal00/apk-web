import { FC, useCallback, useState } from "react";
import { Column } from "../../../components";
import { TStory } from "src/types";

interface IStoryProps {
    story: TStory;
}

export const Story: FC<IStoryProps> = ({ story }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggleModal = useCallback(() => setIsModalOpen((prev) => !prev), []);

    return (
        <>
            <Column.Item
                toggleModal={handleToggleModal}
                isModalOpen={isModalOpen}
                modalContent={<div></div>}
                task={story}
            />
        </>
    );
};
