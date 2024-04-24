import { FC } from "react";
import { Card } from "src/components/common";
import { KebabMenu } from "./KebabMenu";
import { TProject } from "src/types";
import ReactTimeAgo from "react-time-ago";

interface IProjectCardProps {
    project: TProject;
    removeProject: (projectUid: string) => Promise<void>;
}

export const ProjectCard: FC<IProjectCardProps> = ({
    project: { name, description, logoUrl, createdAt, uid },
    removeProject,
}) => {
    return (
        <Card>
            <Card.Header>
                <img
                    alt="Project Thumbnail"
                    className="aspect-square h-16 rounded-md object-cover"
                    src={logoUrl}
                    width="64"
                />
                <div className="grid gap-1">
                    <h2 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">{name}</h2>
                    <p className="text-sm  accent-gray-700">{description}</p>
                </div>
            </Card.Header>
            <Card.Content>
                <div className="text-sm text-gray-500 dark:text-gray-400" data-id="24">
                    Created <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
                </div>
                <KebabMenu removeProject={removeProject} uid={uid} />
            </Card.Content>
        </Card>
    );
};
