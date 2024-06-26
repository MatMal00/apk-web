import { TStory, TTask } from "src/types";
import { deleteRequest, postRequest, updateRequest } from "./mutations";
import { fetcher } from "./fetcher";
import { mapToCommonResponseModel } from "src/utils";

type TStoryResponseModel = { tasks: { [key: string]: TTask } } & Omit<TStory, "tasks">;

export const fetchStoriesAction = async (url: string): Promise<TStory[]> => {
    try {
        const response = await fetcher<{ [key: string]: TStoryResponseModel }>(url);
        const stories = mapToCommonResponseModel<TStoryResponseModel>(response);
        return stories.map((story) => {
            const tasks = mapToCommonResponseModel<TTask>(story.tasks);
            const estimatedCompletionTime = tasks.reduce((acc, task) => acc + task.estimatedCompletionTime, 0);

            return { ...story, estimatedCompletionTime, tasks };
        });
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
    const uid = await postRequest(`/projects/${projectUid}/stories`, newStory);
    if (!uid) throw new Error("Something went wrong");

    return [{ ...newStory, uid }, ...(stories ?? [])];
};

export const updateStoryAction = async (
    updatedStory: TStory,
    projectUid: string,
    stories?: TStory[]
): Promise<TStory[]> => {
    await updateRequest(`/projects/${projectUid}/stories/${updatedStory.uid}`, updatedStory);
    const updatedStories = stories?.map((story) => (story.uid === updatedStory.uid ? updatedStory : story));
    return updatedStories ?? [];
};

export const deleteStoryAction = async (storyUid: string, projectUid: string, stories?: TStory[]) => {
    await deleteRequest(`/projects/${projectUid}/stories/${storyUid}`);

    return (stories ?? []).filter((story) => story.uid !== storyUid);
};
