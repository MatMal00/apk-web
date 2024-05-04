import { FC } from "react";
import { TASK_STATUS, TTaskStatus } from "src/constants";
import { TCommonUser, TTask } from "src/types";
import { Task } from "./components";
import { Column } from "../Column";

interface ITasksListProps {
    tasks: TTask[];
    updateTaskData: (updatedData: TTask) => Promise<void>;
    deleteTask: (task: TTask) => Promise<void>;
    users: TCommonUser[];
}

export const TasksList: FC<ITasksListProps> = ({ tasks, updateTaskData, deleteTask, users }) => {
    const groupedTasks = tasks?.reduce(
        (acc, story) => {
            acc[story.status].push(story);
            return acc;
        },
        { todo: [], doing: [], done: [] } as Record<TTaskStatus, TTask[]>
    );
    return (
        <div className="flex flex-col gap-6 rounded-lg bg-gray-200 dark:bg-zinc-950">
            <div className="grid gap-6 md:grid-cols-3">
                <Column title="To Do">
                    {groupedTasks?.[TASK_STATUS.TO_DO].map((task) => (
                        <Task
                            key={task.uid}
                            task={task}
                            updateTaskData={updateTaskData}
                            deleteTask={deleteTask}
                            users={users}
                        />
                    ))}
                </Column>
                <Column title="Doing">
                    {groupedTasks?.[TASK_STATUS.DOING].map((task) => (
                        <Task
                            key={task.uid}
                            task={task}
                            updateTaskData={updateTaskData}
                            deleteTask={deleteTask}
                            users={users}
                        />
                    ))}
                </Column>
                <Column title="Done">
                    {groupedTasks?.[TASK_STATUS.DONE].map((task) => (
                        <Task
                            key={task.uid}
                            task={task}
                            updateTaskData={updateTaskData}
                            deleteTask={deleteTask}
                            users={users}
                        />
                    ))}
                </Column>
            </div>
        </div>
    );
};
