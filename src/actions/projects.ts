import { TCommonUser, TProject } from "src/types";
import { deleteRequest, postRequest, updateRequest } from "./mutations";
import { fetcher } from "./fetcher";
import { mapToCommonResponseModel } from "src/utils";

export const fetchProjectsAction = async (): Promise<TProject[]> => {
    try {
        const response = await fetcher<{ [key: string]: TProject }>("/projects");
        return mapToCommonResponseModel<TProject>(response);
    } catch (error) {
        console.error({ error });
        return [];
    }
};

export const fetchUserProjectsAction = async (): Promise<TProject[]> => {
    try {
        const response = await fetcher<{ [key: string]: TProject }>("/projects");
        return mapToCommonResponseModel<TProject>(response);
    } catch (error) {
        console.error({ error });
        return [];
    }
};

export const addNewProjectAction = async (
    newProject: Omit<TProject, "uid">,
    user: TCommonUser,
    projects?: TProject[]
): Promise<TProject[]> => {
    const uid = await postRequest("/projects", newProject);
    if (!uid) throw new Error("Something went wrong");

    await updateRequest(`/users/${user.uid}`, { ...user, projects: [...(user.projects ?? []), uid] });

    return [{ ...newProject, uid }, ...(projects ?? [])];
};

export const removeProjectAction = async (projectUid: string, user: TCommonUser, projects?: TProject[]) => {
    const filteredProjects = user.projects?.filter((project) => project !== projectUid) ?? [];

    await Promise.all([
        deleteRequest(`/projects/${projectUid}`),
        updateRequest(`/users/${user.uid}`, {
            ...user,
            projects: filteredProjects,
        }),
    ]);

    return (projects ?? []).filter((project) => project.uid !== projectUid);
};