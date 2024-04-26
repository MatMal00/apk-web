import { FC } from "react";
import { Column, Task } from "../components";
import { Search } from "./Search";

interface ITasksListProps {
    projectUid: string;
}

export const TasksList: FC<ITasksListProps> = () => {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-bold">Tasks</h2>
            <Search addNewProject={() => Promise.resolve()} />
            <div className="grid grid-cols-3 gap-6">
                <Column title="To Do">
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                </Column>
                <Column title="Doing">
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                </Column>
                <Column title="Done">
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                </Column>
            </div>
        </div>
    );
};
