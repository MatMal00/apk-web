import { FC } from "react";
import { useFetchStories } from "src/libs";
import { Content, SearchStories, SearchTasks } from "./components";
import { TasksList } from "../TasksList";
import { TCommonUser } from "src/types";

interface IStoriesListProps {
    projectUid: string;
    users: TCommonUser[];
}

export const StoriesList: FC<IStoriesListProps> = ({ projectUid, users }) => {
    const { stories, tasks, addNewStory, addNewTask, updateStoryData, deleteStory, updateTaskData, deleteTask } =
        useFetchStories(projectUid);

    return (
        <>
            <SearchStories addNewStory={addNewStory} />
            {stories?.map((story) => {
                return (
                    <div key={story.uid} className="flex flex-col gap-6 rounded-lg bg-gray-200 p-6">
                        <Content
                            story={story}
                            updateStoryData={updateStoryData}
                            deleteStory={deleteStory}
                            users={users}
                        />
                        <SearchTasks addNewTask={addNewTask} storyUid={story.uid} />
                        <TasksList
                            key={story.uid}
                            tasks={tasks}
                            updateTaskData={updateTaskData}
                            deleteTask={deleteTask}
                            users={users}
                        />
                    </div>
                );
            })}
        </>
    );
};
