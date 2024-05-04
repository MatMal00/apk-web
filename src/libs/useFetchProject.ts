import { useCallback } from "react";
import toast from "react-hot-toast";
import { fetchProjectAction, updateProjectAction } from "src/actions";
import { TProject } from "src/types";
import useSWRImmutable from "swr/immutable";

export const useFetchProject = (projectUid: string) => {
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

    return { project: data, error, isLoading, updateProjectData, mutate };
};
