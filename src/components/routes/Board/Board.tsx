import { FC } from "react";
import { useParams } from "react-router-dom";
import { useFetchProject } from "src/libs/useFetchProject";
import { StoriesList } from "./components";

interface IBoardProps {}

export const Board: FC<IBoardProps> = () => {
    const { projectUid = "" } = useParams<{ projectUid: string }>();
    const { project } = useFetchProject(projectUid);

    return (
        <div className="flex w-full flex-col gap-6">
            <h2 className="text-5xl font-bold">{project?.name}</h2>
            <p>{project?.description}</p>
            <div className="border-b-2" />
            <StoriesList projectUid={projectUid} />
        </div>
    );
};
