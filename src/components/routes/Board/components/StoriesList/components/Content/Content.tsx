import { FC } from "react";
import { TStory } from "src/types";
import { Details, Status } from "./components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

interface IContentProps {
    story: TStory;
}

export const Content: FC<IContentProps> = ({ story }) => {
    return (
        <div className="relative flex justify-between">
            <Details
                story={story}
                detailsIcon={<FontAwesomeIcon icon={faCircleInfo} className="cursor-pointer self-end p-2" size="xl" />}
            />
            <Status story={story} />
        </div>
    );
};
