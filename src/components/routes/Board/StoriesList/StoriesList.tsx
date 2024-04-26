import { FC } from "react";
import { Column, Task } from "../components";
import { Search } from "./Search";

interface IStoriesListProps {}

export const StoriesList: FC<IStoriesListProps> = () => {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-bold">Stories</h2>
            <Search addNewProject={() => Promise.resolve()} />
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
