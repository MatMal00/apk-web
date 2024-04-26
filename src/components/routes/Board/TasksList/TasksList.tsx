import { FC } from "react";
import { Column, Task } from "../components";
import { useFetchTasks } from "src/libs";
import { Search } from "./Search";

interface ITasksListProps {
    projectUid: string;
}

export const TasksList: FC<ITasksListProps> = ({ projectUid }) => {
    const { addNewTask, tasks } = useFetchTasks(projectUid);
    console.log(tasks);
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-bold">Tasks</h2>
            <Search addNewTask={addNewTask} />
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
