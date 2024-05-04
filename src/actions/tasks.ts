import { TStory, TTask } from "src/types";
import { deleteRequest, postRequest, updateRequest } from "./mutations";
import { mapBackToObjectModel } from "src/utils";

type TStoryToUpdateModel = Omit<TStory, "tasks"> & { tasks: { [key: string]: Omit<TTask, "uid"> } };

export const addNewTaskAction = async (
    newTask: Omit<TTask, "uid">,
    projectUid: string,
    stories?: TStory[]
): Promise<TStory[]> => {
    if (!stories) return [];

    const storyToUpdate = stories.find((story) => story.uid === newTask.storyUid);
    const uid = await postRequest(`/projects/${projectUid}/stories/${newTask.storyUid}/tasks`, newTask);

    if (!storyToUpdate || !uid) throw new Error("Story not found");

    const taskWithUid = { ...newTask, uid };
    const estimatedCompletionTime =
        storyToUpdate.tasks.reduce((acc, task) => acc + task.estimatedCompletionTime, 0) +
        newTask.estimatedCompletionTime;

    const updatedStory: TStoryToUpdateModel = {
        ...storyToUpdate,
        estimatedCompletionTime,
        tasks: mapBackToObjectModel([...storyToUpdate.tasks, taskWithUid]),
    };
    await updateRequest(`/projects/${projectUid}/stories/${newTask.storyUid}`, updatedStory);

    if (!uid) throw new Error("Something went wrong");

    return stories.map((story) => {
        if (story.uid === newTask.storyUid) return { ...updatedStory, tasks: [...story.tasks, { ...newTask, uid }] };
        return story;
    });
};

export const updateTaskAction = async (
    updatedTask: TTask,
    projectUid: string,
    stories?: TStory[]
): Promise<TStory[]> => {
    if (!stories) return [];

    const storyToUpdate = stories.find((story) => story.uid === updatedTask.storyUid);
    if (!storyToUpdate) throw new Error("Story not found");

    const estimatedCompletionTime =
        storyToUpdate.tasks.reduce((acc, task) => {
            if (task.uid !== updatedTask.uid) return acc + task.estimatedCompletionTime;
            return acc;
        }, 0) + updatedTask.estimatedCompletionTime;
    const updatedTasks = storyToUpdate.tasks.map((task) => (task.uid === updatedTask.uid ? updatedTask : task));

    const updatedStory: TStoryToUpdateModel = {
        ...storyToUpdate,
        tasks: mapBackToObjectModel(updatedTasks),
        estimatedCompletionTime,
    };
    await updateRequest(`/projects/${projectUid}/stories/${updatedTask.storyUid}`, updatedStory);

    return stories.map((story) =>
        story.uid === updatedTask.storyUid ? { ...storyToUpdate, tasks: updatedTasks, estimatedCompletionTime } : story
    );
};

export const deleteTaskAction = async (task: TTask, projectUid: string, stories?: TStory[]) => {
    if (!stories) return [];

    const storyToUpdate = stories.find((story) => story.uid === task.storyUid);
    if (!storyToUpdate) throw new Error("Story not found");

    const estimatedCompletionTime = storyToUpdate.tasks.reduce((acc, storyTask) => {
        if (storyTask.uid !== task.uid) return acc + storyTask.estimatedCompletionTime;
        return acc;
    }, 0);

    const updatedStory: TStoryToUpdateModel = {
        ...storyToUpdate,
        tasks: mapBackToObjectModel(storyToUpdate.tasks),
        estimatedCompletionTime,
    };

    await updateRequest(`/projects/${projectUid}/stories/${task.storyUid}`, updatedStory);
    await deleteRequest(`/projects/${projectUid}/stories/${task.storyUid}/tasks/${task.uid}`);

    return (stories ?? []).map((story) => ({
        ...story,
        tasks: story.tasks.filter((storyTask) => storyTask.uid !== task.uid),
    }));
};
