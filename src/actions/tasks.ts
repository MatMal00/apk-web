import { TStory, TTask } from "src/types";
import { postRequest } from "./mutations";
import { fetcher } from "./fetcher";
import { mapToCommonResponseModel } from "src/utils";

type TStoryResponseModel = { tasks: { [key: string]: TTask } } & Omit<TStory, "tasks">;

export const fetchTasksAction = async (projectUid: string): Promise<TTask[]> => {
    try {
        const response = await fetcher<{ [key: string]: TStoryResponseModel }>(`/projects/${projectUid}/stories`);
        const stories = mapToCommonResponseModel<TStoryResponseModel>(response);
        return stories.map((story) => mapToCommonResponseModel<TTask>(story.tasks)).flat();
    } catch (error) {
        console.error({ error });
        return [];
    }
};

export const addNewTaskAction = async (
    newTask: Omit<TTask, "uid">,
    projectUid: string,
    stories?: TStory[]
): Promise<TStory[]> => {
    const uid = await postRequest(`/projects/${projectUid}/stories/${newTask.storyUid}/tasks`, newTask);
    if (!uid) throw new Error("Something went wrong");

    const storyToUpdate = stories?.find((story) => story.uid === newTask.storyUid);
    if (!storyToUpdate) throw new Error("Story not found");

    if (!stories) return stories ?? [];

    return [...stories, { ...storyToUpdate, tasks: [...storyToUpdate.tasks, { ...newTask, uid }] }];
};
