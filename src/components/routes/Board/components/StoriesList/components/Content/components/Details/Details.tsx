import { FC, ReactNode } from "react";
import { TASK_STATUS } from "src/constants";
import { TStory } from "src/types";
import ReactTimeAgo from "react-time-ago";
import cn from "classnames";

interface IDetailsProps {
    story: TStory;
    detailsIcon: ReactNode;
}

export const Details: FC<IDetailsProps> = ({ story: { name, description, dateAdded, status }, detailsIcon }) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center">
                {detailsIcon}
                <h3
                    className={cn("text-2xl font-bold leading-none", {
                        "line-through": status === TASK_STATUS.DONE,
                    })}
                >
                    {name}
                </h3>
            </div>
            <p>{description}</p>
            <p className="text-gray-500 dark:text-gray-400">
                Created <ReactTimeAgo date={dateAdded} locale="en-US" />
            </p>
        </div>
    );
};
