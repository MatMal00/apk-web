import { useCallback } from "react";
import {
    addNewStoryAction,
    addNewTaskAction,
    deleteStoryAction,
    deleteTaskAction,
    fetchStoriesAction,
    updateStoryAction,
    updateTaskAction,
} from "src/actions";
import { TStory, TTask } from "src/types";
import { useAuth } from "src/hooks";
import useSWRImmutable from "swr/immutable";
import toast from "react-hot-toast";

export const useFetchStories = (projectUid: string) => {
    const { currentUser, updateUserData } = useAuth();
    const { data, error, isLoading, mutate } = useSWRImmutable<TStory[], string>(
        `/projects/${projectUid}/stories`,
        fetchStoriesAction
    );

    const addNewStory = useCallback(
        async (newStory: Omit<TStory, "uid">) => {
            try {
                if (!currentUser) return;

                await mutate((stories) => addNewStoryAction(newStory, projectUid, stories), {
                    optimisticData: (stories) => stories ?? [],
                    populateCache: true,
                    revalidate: false,
                });
                updateUserData();
                toast.success("Successfully added new story");
            } catch {
                toast.error("Failed to add new story");
            }
        },
        [currentUser, mutate, projectUid, updateUserData]
    );

    const addNewTask = useCallback(
        async (newTask: Omit<TTask, "uid">) => {
            try {
                await mutate((stories) => addNewTaskAction(newTask, projectUid, stories), {
                    optimisticData: (stories) => stories ?? [],
                    populateCache: true,
                    revalidate: false,
                });
                toast.success("Successfully added new task");
            } catch {
                toast.error("Failed to add new task");
            }
        },
        [mutate, projectUid]
    );

    const updateStoryData = useCallback(
        async (updatedData: TStory) => {
            try {
                await mutate((stories) => updateStoryAction(updatedData, projectUid, stories), {
                    optimisticData: (stories) => stories ?? [],
                    populateCache: true,
                    revalidate: false,
                });

                toast.success("Successfully updated story data");
            } catch (err) {
                console.log(err);
                toast.error("Failed to update story data");
            }
        },
        [mutate, projectUid]
    );

    const updateTaskData = useCallback(
        async (updatedData: TTask) => {
            try {
                await mutate((stories) => updateTaskAction(updatedData, projectUid, stories), {
                    optimisticData: (stories) => stories ?? [],
                    populateCache: true,
                    revalidate: false,
                });

                toast.success("Successfully updated task data");
            } catch (err) {
                console.log(err);
                toast.error("Failed to update task data");
            }
        },
        [mutate, projectUid]
    );

    const deleteStory = useCallback(
        async (storyUid: string) => {
            try {
                if (!currentUser) return;

                await mutate((stories) => deleteStoryAction(storyUid, projectUid, stories), {
                    optimisticData: (stories) => stories ?? [],
                    populateCache: true,
                    revalidate: false,
                });
                toast.success("Successfully removed story");
            } catch {
                toast.error("Failed to removed story");
            }
        },
        [currentUser, mutate, projectUid]
    );

    const deleteTask = useCallback(
        async (task: TTask) => {
            try {
                if (!currentUser) return;

                await mutate((stories) => deleteTaskAction(task, projectUid, stories), {
                    optimisticData: (stories) => stories ?? [],
                    populateCache: true,
                    revalidate: false,
                });
                toast.success("Successfully removed task");
            } catch {
                toast.error("Failed to removed task");
            }
        },
        [currentUser, mutate, projectUid]
    );

    return {
        stories: data,
        error,
        isLoading,
        updateStoryData,
        updateTaskData,
        addNewStory,
        addNewTask,
        deleteStory,
        deleteTask,
    };
};
