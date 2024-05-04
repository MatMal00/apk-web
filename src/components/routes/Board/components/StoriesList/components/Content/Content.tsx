import { FC, useCallback, useState } from "react";
import { TStory } from "src/types";
import { Details, Status } from "./components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "src/components/common";
import { InfoModalForm } from "./components/InfoModalForm";

interface IContentProps {
    story: TStory;
    updateStoryData: (updatedData: TStory) => void;
    deleteStory: (storyUid: string) => void;
}

export const Content: FC<IContentProps> = ({ story, updateStoryData, deleteStory }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggleModal = useCallback(() => setIsModalOpen((prev) => !prev), []);

    return (
        <>
            <div className="relative flex flex-col justify-between md:flex-row">
                <Details
                    story={story}
                    detailsIcon={
                        <FontAwesomeIcon
                            onClick={handleToggleModal}
                            icon={faCircleInfo}
                            className="cursor-pointer self-end p-2"
                            size="xl"
                        />
                    }
                />
                <Status story={story} />
            </div>
            <Modal large isOpen={isModalOpen} close={handleToggleModal}>
                <InfoModalForm
                    close={handleToggleModal}
                    story={story}
                    updateStoryData={updateStoryData}
                    deleteStory={deleteStory}
                />
            </Modal>
        </>
    );
};
