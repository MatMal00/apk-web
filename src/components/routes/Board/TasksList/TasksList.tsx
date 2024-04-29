import { FC } from "react";
import { Column } from "../components";
import { useFetchTasks } from "src/libs";
import { Search, Task } from "./components";
import { TASK_STATUS } from "src/constants";

interface ITasksListProps {
    projectUid: string;
}

export const TasksList: FC<ITasksListProps> = ({ projectUid }) => {
    const { addNewTask, groupedTasks } = useFetchTasks(projectUid);
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-bold">Tasks</h2>
            <Search addNewTask={addNewTask} />
            <div className="grid grid-cols-3 gap-6">
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
