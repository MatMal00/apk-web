import { useCallback } from "react";
import { addNewProjectAction, fetchProjectsAction, removeProjectAction } from "src/actions";
import { TProject } from "src/types";
import useSWRImmutable from "swr/immutable";
import toast from "react-hot-toast";

export const useFetchProjects = () => {
    const { data, error, isLoading, mutate } = useSWRImmutable<TProject[], string>(`/projects`, fetchProjectsAction);

    const addNewProject = useCallback(
        async (newProject: Omit<TProject, "uid">) => {
            try {
                await mutate((projects) => addNewProjectAction(newProject, projects), {
                    optimisticData: (projects) => projects ?? [],
                    populateCache: true,
                    revalidate: false,
                });
                toast.success("Successfully added new project");
            } catch {
                toast.error("Failed to add new project");
            }
        },
        [mutate]
    );

    const removeProject = useCallback(
        async (projectUid: string) => {
            try {
                await mutate((projects) => removeProjectAction(projectUid, projects), {
                    optimisticData: (projects) => (projects ?? []).filter((project) => project.uid !== projectUid),
                    populateCache: true,
                    revalidate: false,
                });
                toast.success("Successfully removed project");
            } catch {
                toast.error("Failed to removed photo");
            }
        },
        [mutate]
    );

    return { data, error, isLoading, addNewProject, removeProject };
};
