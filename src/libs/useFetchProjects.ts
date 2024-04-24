import { useCallback, useMemo } from "react";
import { addNewProjectAction, fetchProjectsAction, removeProjectAction } from "src/actions";
import { TProject } from "src/types";
import { useAuth } from "src/hooks";
import useSWRImmutable from "swr/immutable";
import toast from "react-hot-toast";

export const useFetchProjects = () => {
    const { currentUser, updateUserData } = useAuth();
    const { data, error, isLoading, mutate } = useSWRImmutable<TProject[], string>(`/projects`, fetchProjectsAction);

    const userProjects = useMemo(
        () => data?.filter((project) => currentUser?.projects?.includes(project.uid)),
        [currentUser?.projects, data]
    );

    const addNewProject = useCallback(
        async (newProject: Omit<TProject, "uid">) => {
            try {
                if (!currentUser) return;

                await mutate((projects) => addNewProjectAction(newProject, currentUser, projects), {
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
        [currentUser, mutate, updateUserData]
    );

    const removeProject = useCallback(
        async (projectUid: string) => {
            try {
                if (!currentUser) return;

                await mutate((projects) => removeProjectAction(projectUid, currentUser, projects), {
                    optimisticData: (projects) => (projects ?? []).filter((project) => project.uid !== projectUid),
                    populateCache: true,
                    revalidate: false,
                });
                updateUserData();
                toast.success("Successfully removed project");
            } catch {
                toast.error("Failed to removed photo");
            }
        },
        [currentUser, mutate, updateUserData]
    );

    return { projects: data, userProjects, error, isLoading, addNewProject, removeProject };
};
