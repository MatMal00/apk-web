import { FC } from "react";
import { useParams } from "react-router-dom";

interface IBoardProps {}

export const Board: FC<IBoardProps> = () => {
    const { projectUid } = useParams<{ projectUid: string }>();
    console.log(projectUid);
    return (
        <div>
            <h2>BOARD</h2>
        </div>
    );
};
