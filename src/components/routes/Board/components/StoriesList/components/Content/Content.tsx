import { FC, useCallback, useState } from "react";
import { TStory } from "src/types";
import { Details, Status } from "./components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "src/components/common";
import { InfoModalForm } from "./components/InfoModalForm";

interface IContentProps {
    story: TStory;
}

export const Content: FC<IContentProps> = ({ story }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggleModal = useCallback(() => setIsModalOpen((prev) => !prev), []);

    return (
        <>
            <div className="relative flex justify-between">
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
                <InfoModalForm close={handleToggleModal} story={story} />
            </Modal>
        </>
    );
};
