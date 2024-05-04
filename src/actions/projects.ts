import { TCommonUser, TProject } from "src/types";
import { deleteRequest, postRequest, updateRequest } from "./mutations";
import { fetcher } from "./fetcher";
import { mapToCommonResponseModel } from "src/utils";

export const fetchProjectsAction = async (url: string): Promise<TProject[]> => {
    try {
        const response = await fetcher<{ [key: string]: TProject }>(url);
        return mapToCommonResponseModel<TProject>(response);
    } catch (error) {
        console.error({ error });
        return [];
    }
};

export const fetchProjectAction = async (projectUid: string): Promise<TProject | undefined> => {
    try {
        const project = await fetcher<TProject>(`/projects/${projectUid}`);
        return project;
    } catch (error) {
        console.error({ error });
        return undefined;
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

export const updateProjectAction = async (updatedProject: TProject, projectUid: string): Promise<TProject> => {
    await updateRequest(`/projects/${projectUid}`, updatedProject);
    return updatedProject;
};
