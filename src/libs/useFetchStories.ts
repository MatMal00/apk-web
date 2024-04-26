import { useCallback } from "react";
import { addNewStoryAction, fetchStoriesAction } from "src/actions";
import { TStory } from "src/types";
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

                await mutate((projects) => addNewStoryAction(newStory, projectUid, projects), {
                    optimisticData: (projects) => projects ?? [],
                    populateCache: true,
                    revalidate: false,
                });
                updateUserData();
                toast.success("Successfully added new project");
            } catch {
                toast.error("Failed to add new project");
            }
        },
        [currentUser, mutate, projectUid, updateUserData]
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

    return { stories: data, error, isLoading, addNewStory };
};
