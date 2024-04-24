import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Card } from "src/components/common";

interface IProjectCardProps {}

export const ProjectCard: FC<IProjectCardProps> = () => {
    return (
        <Card>
            <Card.Header>
                <img
                    alt="Project Thumbnail"
                    className="aspect-square h-16 rounded-md object-cover"
                    src="https://img.freepik.com/free-photo/light-bulb-with-drawing-graph_1232-2105.jpg?size=626&ext=jpg"
                    width="64"
                />
                <div className="grid gap-1">
                    <h2 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                        Acme Website
                    </h2>
                    <p className="text-sm  accent-gray-700">
                        A modern website for Acme Inc, a leading manufacturing company.
                    </p>
                </div>
            </Card.Header>
            <Card.Content>
                <div className="text-sm text-gray-500 dark:text-gray-400" data-id="24">
                    Created 1 week ago
                </div>
                <button className="rounded-lg px-3.5 py-1 transition-colors hover:bg-gray-100" data-id="25">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
            </Card.Content>
        </Card>
    );
};
