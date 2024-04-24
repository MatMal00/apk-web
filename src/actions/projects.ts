import { TProject } from "src/types";
import { deleteRequest, postRequest } from "./mutations";
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

export const addNewProjectAction = async (
    newProject: Omit<TProject, "uid">,
    projects?: TProject[]
): Promise<TProject[]> => {
    const uid = await postRequest("/projects", newProject);
    if (!uid) throw new Error("Something went wrong");

    return [{ ...newProject, uid }, ...(projects ?? [])];
};

export const removeProjectAction = async (projectUid: string, projects?: TProject[]) => {
    await deleteRequest(`/projects/${projectUid}`);
    return (projects ?? []).filter((project) => project.uid !== projectUid);
};
