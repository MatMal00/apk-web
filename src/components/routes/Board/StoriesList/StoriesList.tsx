import { FC } from "react";
import { Column, Task } from "../components";
import { useFetchStories } from "src/libs";
import { Search } from "./Search";

interface IStoriesListProps {
    projectUid: string;
}

export const StoriesList: FC<IStoriesListProps> = ({ projectUid }) => {
    const { stories, addNewStory } = useFetchStories(projectUid);
    console.log(stories);
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-bold">Stories</h2>
            <Search addNewStory={addNewStory} />
            <div className="grid grid-cols-3 gap-6">
                <Column title="To Do">
                    <Task />
                    <Task />
                </Column>
                <Column title="Doing">
                    <Task />
                    <Task />
                </Column>
                <Column title="Done">
                    <Task />
                    <Task />
                </Column>
            </div>
        </div>
    );
};
