import { TStory, TTask } from "src/types";
import { postRequest } from "./mutations";
import { fetcher } from "./fetcher";
import { mapToCommonResponseModel } from "src/utils";

type TStoryResponseModel = { tasks: { [key: string]: TTask } } & Omit<TStory, "tasks">;

export const fetchStoriesAction = async (url: string): Promise<TStory[]> => {
    try {
        const response = await fetcher<{ [key: string]: TStoryResponseModel }>(url);
        const stories = mapToCommonResponseModel<TStoryResponseModel>(response);
        return stories.map((story) => ({ ...story, tasks: mapToCommonResponseModel<TTask>(story.tasks) }));
    } catch (error) {
        console.error({ error });
        return [];
    }
};

export const addNewStoryAction = async (
    newStory: Omit<TStory, "uid">,
    projectUid: string,
    stories?: TStory[]
): Promise<TStory[]> => {
    console.log({ newStory });
    const uid = await postRequest(`/projects/${projectUid}/stories`, newStory);
    if (!uid) throw new Error("Something went wrong");

    return [{ ...newStory, uid }, ...(stories ?? [])];
};
