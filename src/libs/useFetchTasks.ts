import { useCallback } from "react";
import toast from "react-hot-toast";
import { addNewTaskAction, fetchTasksAction } from "src/actions";
import { TTaskStatus } from "src/constants";
import { TTask } from "src/types";
import useSWRImmutable from "swr/immutable";

export const useFetchTasks = (projectUid: string) => {
    const { data, error, isLoading, mutate } = useSWRImmutable<TTask[], string>(`/projects/${projectUid}/tasks`, () =>
        fetchTasksAction(projectUid)
    );

    const addNewTask = useCallback(
        async (newStory: Omit<TTask, "uid">) => {
            try {
                await mutate((tasks) => addNewTaskAction(newStory, projectUid, tasks), {
                    optimisticData: (tasks) => tasks ?? [],
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

    // const removeProject = useCallback(
    //     async (projectUid: string) => {
    //         try {
    //             if (!currentUser) return;

    //             await mutate((projects) => removeProjectAction(projectUid, currentUser, projects), {
    //                 optimisticData: (projects) => (projects ?? []).filter((project) => project.uid !== projectUid),
    //                 populateCache: true,
    //                 revalidate: false,
    //             });
    //             updateUserData();
    //             toast.success("Successfully removed project");
    //         } catch {
    //             toast.error("Failed to removed photo");
    //         }
    //     },
    //     [currentUser, mutate, updateUserData]
    // );

    const groupedTasks = data?.reduce(
        (acc, story) => {
            acc[story.status].push(story);
            return acc;
        },
        { todo: [], doing: [], done: [] } as Record<TTaskStatus, TTask[]>
    );

    return { tasks: data, groupedTasks, error, isLoading, addNewTask };
};
