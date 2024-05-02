import { TStory, TTask } from "src/types";
import { postRequest, updateRequest } from "./mutations";
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
    if (!stories) return stories ?? [];

    const storyToUpdate = stories.find((story) => story.uid === newTask.storyUid);
    if (!storyToUpdate) throw new Error("Story not found");

    const estimatedCompletionTime =
        storyToUpdate.tasks.reduce((acc, task) => acc + task.estimatedCompletionTime, 0) +
        newTask.estimatedCompletionTime;
    const updatedStory = { ...storyToUpdate, estimatedCompletionTime };
    await updateRequest(`/projects/${projectUid}/stories/${newTask.storyUid}`, updatedStory);

    const uid = await postRequest(`/projects/${projectUid}/stories/${newTask.storyUid}/tasks`, newTask);
    console.log(uid);
    if (!uid) throw new Error("Something went wrong");

    return stories.map((story) => {
        if (story.uid === newTask.storyUid) return { ...updatedStory, tasks: [...story.tasks, { ...newTask, uid }] };
        return story;
    });
};
