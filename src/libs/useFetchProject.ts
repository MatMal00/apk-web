import { useCallback } from "react";
import toast from "react-hot-toast";
import { addUserToProjectAction, fetchProjectAction, updateProjectAction } from "src/actions";
import { useAuth } from "src/hooks";
import { TCommonUser, TProject } from "src/types";
import useSWRImmutable from "swr/immutable";

export const useFetchProject = (projectUid: string) => {
    const { updateUserData } = useAuth();
    const { data, error, isLoading, mutate } = useSWRImmutable<TProject | undefined, string>(
        `/projects/${projectUid}`,
        () => fetchProjectAction(projectUid)
    );

    const updateProjectData = useCallback(
        async (updatedData: TProject) => {
            try {
                await mutate(() => updateProjectAction(updatedData, projectUid), {
                    optimisticData: (project) => project,
                    populateCache: true,
                    revalidate: false,
                });

                toast.success("Successfully updated project data");
            } catch (err) {
                console.log(err);
                toast.error("Failed to update project data");
            }
        },
        [mutate, projectUid]
    );

    const addUserToProject = useCallback(
        async (user: TCommonUser) => {
            try {
                await mutate((project) => addUserToProjectAction(user, project), {
                    optimisticData: (project) => project,
                    populateCache: true,
                    revalidate: false,
                });
                updateUserData();
                toast.success("Successfully to added user to project");
            } catch {
                toast.error("Failed to add user to project");
            }
        },
        [mutate, updateUserData]
    );

    return { project: data, error, isLoading, updateProjectData, addUserToProject, mutate };
};
