import { FC } from "react";
import { TASK_STATUS, TTaskStatus } from "src/constants";
import { TTask } from "src/types";
import { Column } from "../../../Column";
import { Task } from "./Task";

interface ITasksListProps {
    tasks: TTask[];
}

export const TasksList: FC<ITasksListProps> = ({ tasks }) => {
    const groupedTasks = tasks?.reduce(
        (acc, story) => {
            acc[story.status].push(story);
            return acc;
        },
        { todo: [], doing: [], done: [] } as Record<TTaskStatus, TTask[]>
    );
    return (
        <div className="flex flex-col gap-6 rounded-lg bg-gray-200">
            <div className="grid gap-6 md:grid-cols-3">
                <Column title="To Do">
                    {groupedTasks?.[TASK_STATUS.TO_DO].map((task) => <Task key={task.uid} task={task} />)}
                </Column>
                <Column title="Doing">
                    {groupedTasks?.[TASK_STATUS.DOING].map((task) => <Task key={task.uid} task={task} />)}
                </Column>
                <Column title="Done">
                    {groupedTasks?.[TASK_STATUS.DONE].map((task) => <Task key={task.uid} task={task} />)}
                </Column>
            </div>
        </div>
    );
};
