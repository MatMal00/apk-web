import { FC } from "react";
import { useFetchStories } from "src/libs";
import { Content, SearchStories, SearchTasks } from "./components";
import { TasksList } from "../TasksList";

interface IStoriesListProps {
    projectUid: string;
}

export const StoriesList: FC<IStoriesListProps> = ({ projectUid }) => {
    const { stories, addNewStory, addNewTask, updateStoryData, deleteStory } = useFetchStories(projectUid);

    return (
        <>
            <SearchStories addNewStory={addNewStory} />
            {stories?.map((story) => {
                return (
                    <div key={story.uid} className="flex flex-col gap-6 rounded-lg bg-gray-200 p-6">
                        <Content story={story} updateStoryData={updateStoryData} deleteStory={deleteStory} />
                        <SearchTasks addNewTask={addNewTask} storyUid={story.uid} />
                        <TasksList key={story.uid} tasks={story.tasks} />
                    </div>
                );
            })}
        </>
    );
};
