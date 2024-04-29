import { FC } from "react";
import { useFetchStories } from "src/libs";
import { Search, Story } from "./components";
import { Column } from "../components";
import { TASK_STATUS } from "src/constants";

interface IStoriesListProps {
    projectUid: string;
}

export const StoriesList: FC<IStoriesListProps> = ({ projectUid }) => {
    const { groupedStories, addNewStory } = useFetchStories(projectUid);

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-bold">Stories</h2>
            <Search addNewStory={addNewStory} />
            <div className="grid grid-cols-3 gap-6">
                <Column title="To Do">
                    {groupedStories?.[TASK_STATUS.TO_DO].map((story) => <Story key={story.uid} story={story} />)}
                </Column>
                <Column title="Doing">
                    {groupedStories?.[TASK_STATUS.DOING].map((story) => <Story key={story.uid} story={story} />)}
                </Column>
                <Column title="Done">
                    {groupedStories?.[TASK_STATUS.DONE].map((story) => <Story key={story.uid} story={story} />)}
                </Column>
            </div>
        </div>
    );
};
